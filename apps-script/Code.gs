/**
 * GMO 토론 학습지 - 응답 수집용 Apps Script 웹 앱
 *
 * 설치: 구글 스프레드시트 -> 확장 프로그램 -> Apps Script 에 이 파일 내용을 붙여넣고,
 *       "배포 -> 새 배포 -> 유형: 웹 앱" 으로 배포한다.
 *   - 실행 계정: 나
 *   - 액세스 권한: 모든 사용자(익명 포함)
 * 배포 후 나오는 웹 앱 URL 을 config.js 의 submitUrl 에 넣는다.
 *
 * 자세한 순서는 저장소 루트의 SETUP-스프레드시트.md 참고.
 */

// 응답이 쌓일 시트 이름 (없으면 자동 생성)
var SHEET_NAME = '응답';

// 스팸 방지용 공유 토큰. 쓰려면 config.js 의 token 과 똑같이 맞춘다. 안 쓰면 '' 로 둔다.
var SHARED_TOKEN = '';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    var body = JSON.parse(e.postData.contents);

    if (SHARED_TOKEN && body.token !== SHARED_TOKEN) {
      return jsonOut({ result: 'error', message: 'unauthorized' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // 첫 응답이면 헤더 행을 만든다 (클라이언트가 보낸 순서를 그대로 사용)
    var headers = body.headers || Object.keys(body.row || {});
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
    }

    // 시트의 실제 헤더 순서에 맞춰 한 줄을 구성
    var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = body.row || {};
    var out = headerRow.map(function (h) {
      if (h === '제출시각') return new Date();
      var val = row[h];
      return (val === undefined || val === null) ? '' : String(val);
    });

    sheet.appendRow(out);
    return jsonOut({ result: 'ok' });
  } catch (err) {
    return jsonOut({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// 브라우저로 웹 앱 URL 을 열면 동작 여부를 확인할 수 있다.
function doGet() {
  return jsonOut({ result: 'ok', message: 'GMO worksheet collector is running.' });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
