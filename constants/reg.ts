export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 정규식
export const COMPANY_REGEX = /^[a-zA-Z0-9._%+-]+$/; // 회사 로그인 정규식
export const BUSINESS_NUMBER_REGEX = /^\d{3}-\d{2}-\d{5}$/; // 사업자등록번호 정규식
export const EMAIL_ID_REGEX = /^[a-z0-9]+$/; // 이메일 아이디 정규식

// 비밀번호 정규식
export const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/;
