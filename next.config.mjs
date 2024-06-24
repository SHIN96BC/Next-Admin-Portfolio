/** @type {import('next').NextConfig} */
/* Next.js 최신버전부터는 next.config.js파일이 CommonJS(module.exports)(.js) 형식에서 ES 모듈 형식(export default)(.mjs)으로 변경되었습니다. */
const nextConfig = {
  /* prod 환경에서 log 제거 */
  ...(process.env.NEXT_PUBLIC_NODE_ENV === "prod" && {
    compiler: {
      removeConsole: {
        exclude: ["error", "warn"],
      },
    },
  }),
  /* region - react-beautiful-dnd에서 droppable-id를 인식하지 못하는 문제를 해결하기 위한 설정 추가 */
  reactStrictMode: false,
  swcMinify: true,
  /* endregion - react-beautiful-dnd에서 droppable-id를 인식하지 못하는 문제를 해결하기 위한 설정 추가 */
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    }
  },
  /* Next.js가 외부 도메인에서 이미지를 로드할 수 있도록 허용할 도메인들 설정 */
  images: {
    domains: [''],
  },
  /*  Next.js가 특정 npm 패키지를 트랜스파일하도록 설정하여 ES6+ 문법을 사용하는 패키지와의 호환성을 보장하는 설정. */
  // transpilePackages: [''],
};

export default nextConfig;
