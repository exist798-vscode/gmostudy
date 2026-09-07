/* ============================================================
   GMO 학습지 - 데이터 수집 설정
   ------------------------------------------------------------
   1) apps-script/Code.gs 를 구글 스프레드시트의 Apps Script에 붙여넣고
      "웹 앱"으로 배포한다. (자세한 순서: SETUP-스프레드시트.md)
   2) 배포 후 받은 웹 앱 URL을 아래 submitUrl 에 붙여넣는다.
   3) 스팸 방지용 token 을 쓰려면 Code.gs 의 SHARED_TOKEN 과
      아래 token 값을 똑같이 맞춘다. (안 쓰면 둘 다 "" 로 둔다.)
   4) 저장 후 git push -> Vercel 자동 재배포.

   submitUrl 이 비어 있으면 '제출하기' 버튼은 숨겨지고,
   앱은 기존처럼 PDF 저장만 되는 오프라인 모드로 동작한다.
   ============================================================ */
window.GMO_CONFIG = {
  submitUrl: "https://script.google.com/macros/s/AKfycbzbHlyDZ4MZeHHbXdGrx7DxOfc-YI9FRMqhQb4-rWJQRiVevFcDiWiyJVWgj67E-UqWzA/exec",
  token: ""
};
