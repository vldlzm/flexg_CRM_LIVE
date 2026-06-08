export default function Decisions() {
  const rows = [
    { no: 1,  screen: '전화면', content: '문구 변경. 브랜드메시지(친구톡)의 경우 야간광고 전송 제한으로 인하여  08:00 ~ 20:50(한국 시간)에 발송 가능합니다.' },
    { no: 2,  screen: '전화면', content: '문구 교체. 클릭 액션 → 랜딩 URL' },
    { no: 3,  screen: '/CRM/CRMGuide', content: '(기존)브랜드메시지(친구톡)의 경우 야간광고 전송 제한으로 인하여 오후 9시부터 그 다음날 오전 8시까지의 시간에 광고성 메시지 발송이 제한됩니다. 를 브랜드메시지(친구톡)의 경우 야간광고 전송 제한으로 인하여  08:00 ~ 20:50(한국 시간)에 발송 가능합니다. 로 텍스트 변경' },
    { no: 4,  screen: '생성', content: '와이드 이미지, 와이드리스트는 기존의 이미지형과 동일한 단가로 적용한다.' },
    { no: 5,  screen: 'LMS 메시지 수정 팝업', content: 'LMS 메시지 수정 팝업에서 수신 거부 안내 문구인 (광고)[#{상점명}]은 전체가 고정 텍스트로 처리되어야 합니다. 현재는 (광고)만 고정되어 있으며, [#{상점명}] 부분도 함께 고정되도록 수정이 필요합니다.' },
    { no: 6,  screen: '', content: '' },
    { no: 7,  screen: '', content: '' },
    { no: 8,  screen: '', content: '' },
    { no: 9,  screen: '', content: '' },
    { no: 10, screen: '', content: '' },
    { no: 11, screen: '', content: '' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">결정사항</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] p-6">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="w-16 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">NO</th>
                <th className="w-40 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">화면</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">내용</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.no} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-gray-500">{row.no}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.screen}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 leading-relaxed">{row.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
