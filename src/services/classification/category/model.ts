// 카테고리 id
type Ci = string;
// 카테고리 영어 이름
type Cen = string;
// 카테고리 한글 이름
type Cko = string;
// 카테고리 버전
type Cv = string;
// 카테고리 정렬 가중치
type CMove = number;
// 카테고리 썸네일 이미지
type Cp = string;
// 카테고리 사용여부
type Availability = 'Enabled' | 'Disabled';
// 연령확인 사용여부
type AgeVerification = 'Enabled' | 'Disabled';

// 카테고리 중분류
export interface SubCategoriesRes {
  ci: Ci;
  cen: Cen;
  cko: Cko;
  cMove: CMove;
}

export interface CategoriesRes {
  ci: Ci;
  cen: Cen;
  cko: Cko;
  cv: Cv;
  cMove: CMove;
  child?: SubCategoriesRes[];
}

export interface CategoryMainReq {
  cen: Cen;
  cko: Cko;
  cv: Cv;
  cMove: CMove;
}

export interface CategoryReq {
  cen: Cen;
  cko: Cko;
  availability: Availability;
  ageVerification: AgeVerification;
  cp: Cp;
  cv: Cv;
}

export interface CategoryRes {
  cen: Cen;
  cko: Cko;
  availability: Availability;
  ageVerification: AgeVerification;
  cp: Cp;
  cv: Cv;
}

export interface CategorySort {
  ci: Ci;
  cMove: CMove;
}