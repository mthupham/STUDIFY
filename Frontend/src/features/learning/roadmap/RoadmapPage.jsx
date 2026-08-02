import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../auth/store/useAuthStore';
import './RoadmapPage.css'; // Đã xóa dòng import mock JSON tĩnh

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export default function RoadmapPage() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [pressedNode, setPressedNode] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [pressedCard, setPressedCard] = useState(null);
  const [activeLevelIndex, setActiveLevelIndex] = useState(0);
  const [assignedLevel, setAssignedLevel] = useState('A1');
  const [currentLevelTitle, setCurrentLevelTitle] = useState('Beginner');
  const [loadingRoadmap, setLoadingRoadmap] = useState(true);
  const [roadmapError, setRoadmapError] = useState(null);

  // Thêm state lưu dữ liệu roadmap từ API
  const [roadmapData, setRoadmapData] = useState(null);

  const SECTION_WIDTH = 2000;
  const getNodeTop = (row) => (row === 'top' ? 36 : 180);
  const getNodeCenterY = (row) => (row === 'top' ? 80 : 224);

  const levelLabels = {
    A1: 'Beginner',
    A2: 'Upper Beginner',
    B1: 'Intermediate',
    B2: 'Upper intermediate',
    C1: 'Expert',
    C2: 'Upper Expert'
  };

  // Cập nhật: useEffect cho scroll cần có dependency roadmapData để lấy đúng chiều dài views
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !roadmapData) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const viewportWidth = scrollContainer.clientWidth;
      const centerScroll = scrollLeft + viewportWidth / 2;
      const centerViewIndex = Math.floor(centerScroll / SECTION_WIDTH);
      const levelIndex = Math.max(0, Math.min(centerViewIndex, roadmapData.views.length - 1));
      setActiveLevelIndex(levelIndex);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [roadmapData]); // Dependency ở đây

  useEffect(() => {
    let cancelled = false;
    const loadRoadmap = async () => {
      if (!token) return;
      setLoadingRoadmap(true);
      setRoadmapError(null);
      try {
        // ĐỔI THÀNH URL API CỦA BẠN (Ví dụ: /roadmap/full)
        // Xóa chữ /full đi, chỉ để /roadmap
      const { data } = await axios.get(`${API_BASE}/roadmap`, {
        headers: { Authorization: `Bearer ${token}` },
      });

        if (!cancelled) {
          // Xử lý tùy theo format trả về của NestJS (thường bọc trong biến data)
          const payload = data.data || data;
          
          setRoadmapData(payload); // Lưu toàn bộ JSON (levels, views, metrics) vào state
          
          // Ưu tiên lấy assignedLevel từ payload ngoài cùng, nếu không có thì trích từ metrics
          const assigned = payload.assignedLevel || (payload.metrics && payload.metrics.level ? payload.metrics.level.substring(0,2) : 'A1');
          setAssignedLevel(assigned);
          setCurrentLevelTitle(payload.levelTitle || levelLabels[assigned] || 'Beginner');
        }
      } catch (error) {
        if (!cancelled) {
          setRoadmapError('Không thể tải lộ trình Roadmap.');
        }
      } finally {
        if (!cancelled) {
          setLoadingRoadmap(false);
        }
      }
    };

    loadRoadmap();
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Tự động cuộn ngang tới đúng level hiện tại (assignedLevel) ngay khi data vừa load xong
  useEffect(() => {
    if (!roadmapData || !scrollRef.current) return;

    const levelIndex = roadmapData.levels.findIndex((lvl) => lvl === assignedLevel);
    if (levelIndex <= 0) return; // A1 (index 0) thì không cần cuộn, mặc định đã đúng vị trí

    const scrollContainer = scrollRef.current;
    const viewportWidth = scrollContainer.clientWidth;
    // Căn giữa view của level hiện tại trong khung nhìn
    const targetScrollLeft =
      SECTION_WIDTH * levelIndex - viewportWidth / 2 + SECTION_WIDTH / 2;

    scrollContainer.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'auto', // dùng 'auto' để nhảy thẳng ngay lúc load, tránh hiệu ứng cuộn giật khi vừa vào trang
    });

    setActiveLevelIndex(levelIndex);
  }, [roadmapData, assignedLevel]);

  const makePath = (views) => {
    const points = views.flatMap((view, viewIndex) =>
      view.nodes.map((node) => ({
        x: SECTION_WIDTH * viewIndex + (node.position / 100) * SECTION_WIDTH,
        y: getNodeCenterY(node.row)
      }))
    );

    if (!points.length) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      
      const controlX1 = prev.x + dx * 0.33;
      const controlX2 = curr.x - (next ? (next.x - curr.x) * 0.33 : dx * 0.33);
      
      const controlY1 = prev.y;
      const controlY2 = curr.y;
      
      path += ` C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${curr.x} ${curr.y}`;
    }
    return path;
  };

  const badgeColors = {
    A1: '#34D399',
    A2: '#60A5FA',
    B1: '#F59E0B',
    B2: '#3B82F6',
    C1: '#6366F1',
    C2: '#0EA5E9'
  };

  // HIỂN THỊ LOADING UI
  if (loadingRoadmap && !roadmapData) {
    return (
      <div style={styles.pageBackground}>
        <div style={{...styles.card, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400}}>
          <h2 style={{color: '#9CA3AF'}}>Đang tải lộ trình...</h2>
        </div>
      </div>
    );
  }

  // HIỂN THỊ ERROR UI
  if (roadmapError) {
    return (
      <div style={styles.pageBackground}>
        <div style={{...styles.card, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400}}>
          <h2 style={{color: '#EF4444'}}>{roadmapError}</h2>
        </div>
      </div>
    );
  }

  // ĐẢM BẢO ROADMAP DATA ĐÃ SẴN SÀNG TRƯỚC KHI RENDER CÂY
  if (!roadmapData) return null;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.card}>
        <header style={styles.header}>
          <div>
            <h2 style={styles.title}>Learning Roadmap</h2>
            <p style={styles.sub}>Mastering English: From Beginner to Fluency</p>
          </div>
          <div style={styles.badge}>
            🏆 Current: {`${assignedLevel} ${currentLevelTitle}`}
          </div>
        </header>

        <section style={styles.levelRibbon}>
          <div style={styles.levelLine} />
          {roadmapData.levels.map((level, index) => {
            const isCurrent = level === assignedLevel;
            return (
              <div key={level} style={styles.levelBadgeWrapper}>
                <span style={{ 
                  ...styles.levelBadge, 
                  background: isCurrent ? badgeColors[level] : index === activeLevelIndex ? badgeColors[level] : '#CBD5E1',
                  color: isCurrent || index === activeLevelIndex ? '#fff' : '#6B7280',
                  transition: 'all 0.3s ease'
                }}>{level}</span>
                <div style={{ 
                  ...styles.levelLabel,
                  color: isCurrent ? '#111827' : index === activeLevelIndex ? '#1F2937' : '#9CA3AF',
                  fontWeight: isCurrent ? 700 : 500,
                  transition: 'color 0.3s ease'
                }}>{levelLabels[level]}</div>
              </div>
            );
          })}
        </section>

        <div className="roadmapScroll" ref={scrollRef} style={styles.scrollArea}>
          <div style={styles.track}>
            <svg width={roadmapData.views.length * SECTION_WIDTH} height="320" style={styles.pathSvg} viewBox={`0 0 ${roadmapData.views.length * SECTION_WIDTH} 320`}>
              <path
                d={makePath(roadmapData.views)}
                stroke="#CBD5E1"
                strokeDasharray="4 12"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            {roadmapData.views.map((view, viewIndex) => (
              <section key={view.id} style={styles.viewSection}>
                <div style={styles.pathArea}>
                  {view.nodes.map((node) => {
                    const isClickable = node.status !== 'locked';
                    const hot = hoveredNode === node.id;
                    const down = pressedNode === node.id;
                    return (
                      <div key={node.id} style={{ ...styles.nodeWrapper, left: `${node.position}%`, top: getNodeTop(node.row) }}>
                        <button
                          type="button"
                          onClick={() => {
                            if (isClickable) navigate(`/lessons/${node.id}`);
                          }}
                          onMouseEnter={() => isClickable && setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          onPointerDown={(event) => {
                            event.stopPropagation();
                            if (!isClickable) return;
                            setPressedNode(node.id);
                          }}
                          onPointerUp={() => setPressedNode(null)}
                          onPointerCancel={() => setPressedNode(null)}
                          style={{
                            ...styles.node,
                            ...(node.status === 'completed' ? styles.completed : node.status === 'active' ? styles.active : styles.locked),
                            ...(isClickable ? styles.actionable : {}),
                            ...(hot ? styles.nodeHover : {}),
                            ...(down ? styles.nodeActive : {})
                          }}
                        >
                          {node.status === 'completed' && <span style={styles.check}>✓</span>}
                          {node.status === 'active' && <span style={styles.play}>▶</span>}
                          {node.status === 'locked' && <span style={styles.lock}>🔒</span>}
                        </button>
                        <div style={styles.nodeLabelGroup}>
                          <div style={{ ...styles.nodeLabel, color: node.status === 'locked' ? '#9CA3AF' : '#1F2937' }}>{node.label}</div>
                          <div style={styles.nodeMeta}>{node.status === 'active' ? 'In progress' : node.status === 'completed' ? 'Completed' : 'Locked'}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div style={styles.bottomRow}>
          <button
            type="button"
            onMouseEnter={() => setHoveredCard('metrics')}
            onMouseLeave={() => setHoveredCard(null)}
            onPointerDown={() => setPressedCard('metrics')}
            onPointerUp={() => setPressedCard(null)}
            onPointerCancel={() => setPressedCard(null)}
            style={{
              ...styles.metricCard,
              ...(hoveredCard === 'metrics' ? styles.cardHover : {}),
              ...(pressedCard === 'metrics' ? styles.cardActive : {})
            }}
          >
            <div style={styles.metricCol}>
              <div style={styles.metricLabel}>LEVEL</div>
              <div style={styles.metricValue}>{roadmapData.metrics.level}</div>
            </div>
            <div style={styles.metricCol}>
              <div style={styles.metricLabel}>LESSONS</div>
              <div style={styles.metricValue}>{roadmapData.metrics.lessons}</div>
            </div>
            <div style={styles.metricCol}>
              <div style={styles.metricLabel}>STREAK</div>
              <div style={styles.metricValue}>🔥 {roadmapData.metrics.streak}</div>
            </div>
          </button>
          <button
            type="button"
            onMouseEnter={() => setHoveredCard('tip')}
            onMouseLeave={() => setHoveredCard(null)}
            onPointerDown={() => setPressedCard('tip')}
            onPointerUp={() => setPressedCard(null)}
            onPointerCancel={() => setPressedCard(null)}
            style={{
              ...styles.tipCard,
              ...(hoveredCard === 'tip' ? styles.cardHover : {}),
              ...(pressedCard === 'tip' ? styles.cardActive : {})
            }}
          >
            <div>
              <p style={styles.tipTitle}>Tips</p>
              <p style={styles.tipText}>{roadmapData.metrics.tip}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Bê nguyên styles cũ của bạn, không đổi 1 chữ
const styles = {
  pageBackground: {
    background: '#F8F9FA',
    minHeight: '100%',
    padding: '40px 20px'
  },
  card: {
    width: '100%',
    margin: '0 auto',
    background: '#fff',
    borderRadius: 24,
    padding: 28,
    boxShadow: '0 24px 60px rgba(15,23,42,0.08)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
    marginBottom: 20
  },
  title: { margin: 0, color: '#0F172A', fontSize: 30 },
  sub: { margin: '8px 0 0', color: '#475569', lineHeight: 1.6 },
  badge: {
    background: '#EFF6FF',
    color: '#1E3A8A',
    padding: '10px 16px',
    borderRadius: 14,
    fontWeight: 700,
    whiteSpace: 'nowrap'
  },
  levelRibbon: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: '18px 0 26px'
  },
  levelLine: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    height: 1,
    background: '#E2E8F0',
    transform: 'translateY(-50%)',
    zIndex: 0
  },
  levelBadgeWrapper: {
    position: 'relative',
    zIndex: 1,
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  levelBadge: {
    color: '#fff',
    padding: '10px 14px',
    borderRadius: 999,
    fontWeight: 700,
    minWidth: 58,
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: '0.02em'
  },
  levelLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center'
  },
  scrollArea: {
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    paddingBottom: 12,
    borderRadius: 12,
    background: '#FAFBFC'
  },
  track: {
    position: 'relative',
    display: 'flex',
    gap: 24,
    alignItems: 'stretch'
  },
  viewSection: {
    minWidth: 2000,
    flex: '0 0 2000px',
    position: 'relative'
  },
  pathArea: {
    position: 'relative',
    height: 320,
    marginBottom: 24
  },
  pathSvg: {
    position: 'absolute',
    inset: 0,
    overflow: 'visible',
    pointerEvents: 'none'
  },
  nodeWrapper: {
    position: 'absolute',
    transform: 'translate(-50%, 0)',
    width: 140,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10
  },
  node: {
    width: 96,
    height: 96,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    color: '#fff',
    border: 'none',
    transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
    boxShadow: '0 14px 30px rgba(15,23,42,0.08)',
    cursor: 'pointer'
  },
  nodeLabelGroup: {
    marginTop: 14,
    textAlign: 'center',
    maxWidth: 140,
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  },
  nodeLabel: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  nodeMeta: {
    marginTop: 8,
    fontSize: 13,
    color: '#6B7280'
  },
  actionable: {
    cursor: 'pointer'
  },
  nodeHover: {
    transform: 'scale(1.04)',
    boxShadow: '0 18px 34px rgba(15,23,42,0.12)'
  },
  nodeActive: {
    transform: 'scale(0.96)',
    boxShadow: '0 10px 20px rgba(15,23,42,0.16)'
  },
  completed: { background: '#047857' },
  active: { background: '#1D4ED8', width: 115, height: 115, fontSize: 32 },
  locked: { background: '#E5E7EB', color: '#6B7280', cursor: 'default', boxShadow: 'none' },
  check: { fontSize: 36 },
  play: { fontSize: 34 },
  lock: { fontSize: 28 },
  bottomRow: { display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'stretch', marginTop: 36 },
  metricCard: {
    flex: 1,
    background: '#fff',
    padding: 22,
    borderRadius: 18,
    border: '1px solid #E5E7EB',
    boxShadow: '0 12px 28px rgba(15,23,42,0.06)',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 16,
    textAlign: 'left',
    minWidth: 0
  },
  metricCol: { display: 'flex', flexDirection: 'column', gap: 6 },
  metricLabel: { fontSize: 13, color: '#6B7280', letterSpacing: '0.04em' },
  metricValue: { fontSize: 20, fontWeight: 800, color: '#1D4ED8' },
  tipCard: {
    flex: 0.75,
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
    background: '#EFF6FF',
    padding: 22,
    borderRadius: 18,
    border: '1px solid rgba(14,165,233,0.16)',
    boxShadow: '0 12px 28px rgba(14,165,233,0.12)',
    color: '#075985',
    minWidth: 240
  },
  tipTitle: { margin: 0, fontSize: 15, fontWeight: 800, color: '#0F172A' },
  tipText: { margin: '8px 0 0', fontSize: 15, lineHeight: 1.6 },
  cardHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 14px 30px rgba(15,23,42,0.12)'
  },
  cardActive: {
    transform: 'translateY(1px)',
    boxShadow: '0 10px 20px rgba(15,23,42,0.16)'
  }
};