import apiClient from '../../services/apiClient';

// Hàm gửi kết quả bài test lên Backend NestJS
export const submitPlacementTest = async (answersData: any) => {
  const response = await apiClient.post('/placement-test/submit', answersData);
  return response.data;
};