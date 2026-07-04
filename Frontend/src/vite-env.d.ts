/// <reference types="vite/client" />

declare module '*.jsx' {
  const component: any;
  export default component;
}

declare module '*.js' {
  const component: any;
  export default component;
}
