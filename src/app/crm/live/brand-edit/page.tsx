'use client';

import { useState } from 'react';

const LMS_REPLACEMENTS = [
  { key: '#{상점명}', desc: '쇼핑몰명' },
  { key: '#{채널명}', desc: '쇼핑몰 채널명' },
  { key: '#{회원명}', desc: '주문자명' },
  { key: '#{쿠폰명}', desc: '쿠폰 이름' },
  { key: '#{할인코드}', desc: '할인 코드' },
];

const INITIAL_WIDE_LIST_ITEMS = Array.from({ length: 5 }, () => ({ text: '' }));

export default function BrandEditPage() {
  const [brandEditTab, setBrandEditTab] = useState<'wide-image' | 'wide-list'>('wide-image');
  const [wideImageContent, setWideImageContent] = useState('');
  const [wideImageBtn1, setWideImageBtn1] = useState('');
  const [wideImageBtn2, setWideImageBtn2] = useState('');
  const [wideListHeader, setWideListHeader] = useState('');
  const [wideListItems, setWideListItems] = useState(INITIAL_WIDE_LIST_ITEMS);
  const [wideListBtn1, setWideListBtn1] = useState('');
  const [wideListBtn2, setWideListBtn2] = useState('');

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      {/* 헤더 */}
      <div className="flex items-center gap-3 bg-[#252830] px-6 py-4 shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="2" width="5" height="5" rx="1" /><rect x="2" y="9" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-white">브랜드메시지 수정</h2>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-gray-200 bg-white shrink-0">
        {(['wide-image', 'wide-list'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setBrandEditTab(tab)}
            className={`px-6 py-3 text-sm font-semibold transition-colors ${brandEditTab === tab ? 'border-b-2 border-[#4DB87A] text-[#4DB87A]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab === 'wide-image' ? '와이드 이미지' : '와이드 리스트'}
          </button>
        ))}
      </div>

      {/* 본문 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측: 미리보기 */}
        <div className="w-64 shrink-0 border-r border-gray-200 bg-gray-50 flex items-start justify-center p-5 overflow-y-auto">
          <div className="w-48 overflow-hidden rounded-3xl border-2 border-gray-300 bg-[#c5d9ed] shadow-md">
            <div className="flex items-center justify-between bg-[#c5d9ed] px-3 py-2 border-b border-[#b0c8e0]">
              <span className="text-sm font-bold text-gray-700">‹</span>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-gray-800">채널명 ✓</span>
                <span className="text-[8px] text-gray-500">1577-0000</span>
              </div>
              <div className="flex gap-1.5 text-xs text-gray-600"><span>Q</span><span>≡</span></div>
            </div>
            <div className="px-2 py-2.5">
              <div className="flex items-start gap-1.5">
                <div className="h-6 w-6 shrink-0 rounded-full bg-yellow-300 flex items-center justify-center text-[9px] font-bold border border-yellow-400">K</div>
                <div className="flex-1">
                  <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                    <p className="px-2.5 pt-1.5 text-[8px] text-gray-400">(광고) 채널명</p>
                    {brandEditTab === 'wide-image' ? (
                      <>
                        <div className="mx-2 my-1 h-20 rounded-lg overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-fuchsia-400 to-orange-300" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                            <div className="flex gap-1 text-sm"><span>✨</span><span>📹</span><span>✨</span></div>
                            <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500" /><span className="text-[9px] font-black tracking-widest text-red-500">LIVE</span>
                            </div>
                            <p className="text-xs font-black text-white drop-shadow-md">시작!</p>
                          </div>
                        </div>
                        <div className="px-2.5 pb-1.5"><p className="text-[9px] leading-snug text-gray-700 whitespace-pre-line">{wideImageContent}</p></div>
                        <div className="flex border-t border-gray-100">
                          {wideImageBtn1 && <div className="flex-1 py-1.5 text-center border-r border-gray-100"><span className="text-[10px] font-semibold text-gray-600">{wideImageBtn1}</span></div>}
                          {wideImageBtn2 && <div className="flex-1 py-1.5 text-center"><span className="text-[10px] font-semibold text-gray-600">{wideImageBtn2}</span></div>}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-center text-[10px] font-bold text-gray-800 py-1">{wideListHeader}</p>
                        <div className="mx-2 my-1 h-16 rounded-lg bg-gradient-to-br from-rose-400 via-fuchsia-400 to-orange-300 overflow-hidden relative">
                          <div className="absolute inset-0 flex items-center justify-center"><span className="text-xs font-black text-white drop-shadow-md">LIVE 시작!</span></div>
                        </div>
                        {wideListItems[0].text && (
                          <p className="px-2.5 pb-1 text-[8px] leading-snug text-gray-700">{wideListItems[0].text}</p>
                        )}
                        {wideListItems.slice(1).map((item, i) => (
                          <div key={i + 1} className="flex items-center gap-1.5 border-t border-gray-100 px-2 py-1">
                            <div className="h-7 w-7 shrink-0 rounded bg-gray-200" />
                            <div className="min-w-0">
                              <p className="text-[8px] font-semibold text-gray-800 leading-tight">{item.text}</p>
                            </div>
                          </div>
                        ))}
                        <div className="flex border-t border-gray-100 bg-gray-200">
                          {wideListBtn1 && <div className={`flex-1 py-1.5 text-center ${wideListBtn2 ? 'border-r border-gray-300' : ''}`}><span className="text-[10px] font-semibold text-gray-600">{wideListBtn1}</span></div>}
                          {wideListBtn2 && <div className="flex-1 py-1.5 text-center"><span className="text-[10px] font-semibold text-gray-600">{wideListBtn2}</span></div>}
                          {!wideListBtn1 && !wideListBtn2 && <div className="flex-1 py-1.5 text-center"><span className="text-[10px] font-semibold text-gray-600">LIVE 보기</span></div>}
                        </div>
                      </>
                    )}
                    <div className="border-t border-gray-100 px-2.5 py-1"><p className="text-[7px] text-gray-400">수신거부 | 홈 &gt; 채널 차단</p></div>
                  </div>
                  <p className="mt-0.5 text-[7px] text-gray-400">오전 9:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 우측: 에디터 */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-5">
          {brandEditTab === 'wide-image' ? (
            <div className="border border-gray-200">
              {/* 이미지 */}
              <div className="flex border-b border-gray-200">
                <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">이미지</span>
                </div>
                <div className="flex-1 px-4 py-3">
                  <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                    + 이미지 업로드 (권장 800×600 / jpg,png / 5MB)
                  </div>
                  <p className="mt-1 text-xs text-gray-400">가로:세로 비율 2:1 이상 ~ 1:1 이하</p>
                </div>
              </div>
              {/* 내용 */}
              <div className="flex border-b border-gray-200">
                <div className="flex w-32 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">내용</span>
                </div>
                <div className="flex-1 px-4 py-3">
                  <div className="relative">
                    <textarea value={wideImageContent} onChange={(e) => e.target.value.length <= 76 && setWideImageContent(e.target.value)} rows={4} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#4DB87A] focus:outline-none resize-none" />
                    <span className="absolute right-3 bottom-3 text-xs"><span className="font-semibold text-[#4DB87A]">{wideImageContent.length}</span><span className="text-gray-400">/76</span></span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">줄바꿈 최대 5회</p>
                </div>
              </div>
              {/* 버튼 */}
              <div className="flex">
                <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">버튼</span>
                </div>
                <div className="flex-1 px-4 py-3 space-y-3">
                  <div className="space-y-1.5">
                    <div className="relative">
                      <input type="text" value={wideImageBtn1} onChange={(e) => e.target.value.length <= 8 && setWideImageBtn1(e.target.value)} placeholder="버튼 1" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideImageBtn1.length}</span><span className="text-gray-400">/8</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="relative">
                      <input type="text" value={wideImageBtn2} onChange={(e) => e.target.value.length <= 8 && setWideImageBtn2(e.target.value)} placeholder="버튼 2 (선택)" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideImageBtn2.length}</span><span className="text-gray-400">/8</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">최대 2개 (가로 배열)</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200">
              {/* 헤더 */}
              <div className="flex border-b border-gray-200">
                <div className="flex w-32 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">헤더</span>
                </div>
                <div className="flex-1 px-4 py-3">
                  <div className="relative">
                    <input type="text" value={wideListHeader} onChange={(e) => e.target.value.length <= 20 && setWideListHeader(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 pr-14 text-sm focus:border-[#4DB87A] focus:outline-none" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideListHeader.length}</span><span className="text-gray-400">/20</span></span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">20자 제한 / 줄바꿈 불가</p>
                </div>
              </div>
              {/* 리스트 1 */}
              <div className="flex border-b border-gray-200">
                <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">리스트 1</span>
                </div>
                <div className="flex-1 px-4 py-3 space-y-2">
                  <div className="flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 cursor-pointer hover:bg-gray-100">
                    + 이미지 (2:1 고정 / 800×400 / jpg,png / 5MB)
                  </div>
                  <div className="relative">
                    <input type="text" value={wideListItems[0].text} onChange={(e) => { if (e.target.value.length <= 25) { const n = [...wideListItems]; n[0] = { ...n[0], text: e.target.value }; setWideListItems(n); } }} placeholder="문구" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideListItems[0].text.length}</span><span className="text-gray-400">/25</span></span>
                  </div>
                  <p className="text-xs text-gray-400">줄바꿈 최대 1회</p>
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                    <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                    <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                  </div>
                </div>
              </div>
              {/* 리스트 2~5 */}
              {wideListItems.slice(1).map((item, i) => (
                <div key={i + 1} className="flex border-b border-gray-200 last:border-0">
                  <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                    <span className={`text-sm font-bold ${i + 2 <= 3 ? 'text-[#4DB87A]' : 'text-gray-400'}`}>✓</span>
                    <div>
                      <span className="text-sm font-medium text-gray-700">리스트 {i + 2}</span>
                      {i + 2 >= 4 && <span className="ml-1 text-xs text-gray-400">(선택)</span>}
                    </div>
                  </div>
                  <div className="flex-1 px-4 py-3 space-y-2">
                    <div className="flex h-12 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 cursor-pointer hover:bg-gray-100">
                      + 이미지 (1:1 고정 / 800×800 / jpg,png / 5MB)
                    </div>
                    <div className="relative">
                      <input type="text" value={item.text} onChange={(e) => { if (e.target.value.length <= 30) { const n = [...wideListItems]; n[i + 1] = { ...n[i + 1], text: e.target.value }; setWideListItems(n); } }} placeholder="상품명 및 문구" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{item.text.length}</span><span className="text-gray-400">/30</span></span>
                    </div>
                    <p className="text-xs text-gray-400">줄바꿈 최대 1회</p>
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                    </div>
                  </div>
                </div>
              ))}
              {/* 버튼 */}
              <div className="flex border-t border-gray-200">
                <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">버튼</span>
                </div>
                <div className="flex-1 px-4 py-3 space-y-3">
                  <div className="space-y-1.5">
                    <div className="relative">
                      <input type="text" value={wideListBtn1} onChange={(e) => e.target.value.length <= 8 && setWideListBtn1(e.target.value)} placeholder="버튼 1" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideListBtn1.length}</span><span className="text-gray-400">/8</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="relative">
                      <input type="text" value={wideListBtn2} onChange={(e) => e.target.value.length <= 8 && setWideListBtn2(e.target.value)} placeholder="버튼 2 (선택)" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideListBtn2.length}</span><span className="text-gray-400">/8</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                      <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">버튼명 8자 제한 / 최대 2개 (가로 배열)</p>
                </div>
              </div>
            </div>
          )}

          {/* 치환 */}
          <div className="mt-3 border border-gray-200">
            <div className="flex">
              <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700 mt-0.5">치환</span>
              </div>
              <div className="flex-1 px-4 py-3">
                <div className="space-y-1">
                  {LMS_REPLACEMENTS.map((r) => (
                    <p key={r.key} className="text-sm text-gray-700">
                      <span className="text-gray-800">{r.key}</span>{' '}
                      <span className="text-gray-600">{r.desc}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1 text-xs text-gray-500">
            <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-gray-400 text-[9px] font-bold">i</span>
            모바일 해상도에 따라 다소 차이가 있을 수 있습니다.
          </p>
        </div>
      </div>

      {/* 푸터 */}
      <div className="flex items-center justify-center gap-3 border-t border-gray-200 bg-[#ebebeb] px-6 py-4 shrink-0">
        <button className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">취소</button>
        <button className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">수정</button>
      </div>
    </div>
  );
}
