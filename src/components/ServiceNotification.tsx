'use client';

import { useState } from 'react';

const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button onClick={onChange} className="flex items-center gap-2 shrink-0">
    <span className="text-xs text-gray-500">OFF</span>
    <div className={`relative h-5 w-9 rounded-full transition-colors ${on ? 'bg-[#4DB87A]' : 'bg-gray-300'}`}>
      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </div>
    <span className="text-xs text-gray-500">ON</span>
  </button>
);

const AddBtn = () => (
  <button className="rounded bg-[#1e6b3c] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#165530] transition-colors">추가 +</button>
);

const AssignBtn = () => (
  <button className="rounded bg-[#4b5563] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">담당자 선택 ›</button>
);

const SampleBtn = () => (
  <button className="rounded border border-gray-300 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">메시지 샘플 ›</button>
);

const Tag = ({ name }: { name: string }) => (
  <span className="text-xs text-gray-700">
    {name} <button className="text-red-400 hover:text-red-600 transition-colors">[삭제]</button>
  </span>
);

const TimeSelect = ({ defaultHour = '00', defaultMin = '00' }: { defaultHour?: string; defaultMin?: string }) => (
  <div className="flex items-center gap-1">
    <select defaultValue={defaultHour} className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#4DB87A] focus:outline-none">
      {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map((h) => (
        <option key={h} value={h}>{h}시</option>
      ))}
    </select>
    <select defaultValue={defaultMin} className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#4DB87A] focus:outline-none">
      {['00', '10', '20', '30', '40', '50'].map((m) => (
        <option key={m} value={m}>{m}분</option>
      ))}
    </select>
  </div>
);

const GroupSelect = ({ defaultValue = '슬테스트' }: { defaultValue?: string }) => (
  <select defaultValue={defaultValue} className="rounded border border-gray-300 px-3 py-1.5 text-xs focus:border-[#4DB87A] focus:outline-none">
    <option value="슬테스트">슬테스트</option>
    <option value="댕댕이모임">댕댕이모임</option>
    <option value="담당자 그룹 선택">담당자 그룹 선택</option>
  </select>
);

const LabelCol = ({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) => (
  <div className={`flex w-52 shrink-0 flex-col items-start justify-center gap-2 border-r border-gray-200 px-5 py-5 ${highlight ? 'bg-[#fff5f5]' : 'bg-gray-50'}`}>
    {children}
  </div>
);

const ContentCol = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 space-y-3 px-6 py-5">{children}</div>
);

export default function ServiceNotification() {
  const [svcOn, setSvcOn] = useState(true);
  const [shopOn, setShopOn] = useState(false);
  const [todayOn, setTodayOn] = useState(false);
  const [yestOn, setYestOn] = useState(false);
  const [weekOn, setWeekOn] = useState(false);
  const [crmBriefOn, setCrmBriefOn] = useState(true);
  const [crmAlertOn, setCrmAlertOn] = useState(false);

  return (
    <div className="min-h-screen bg-white px-8 py-8">
      <h1 className="mb-6 text-xl font-bold text-gray-900">메시지 설정</h1>

      <div className="border border-gray-200">

        {/* 서비스 알림 여부 */}
        <div className="flex border-b border-gray-200">
          <LabelCol>
            <span className="text-sm font-medium text-gray-700">서비스 알림 여부</span>
          </LabelCol>
          <ContentCol>
            <Toggle on={svcOn} onChange={() => setSvcOn(!svcOn)} />
          </ContentCol>
        </div>

        {/* 쇼핑몰 주요 공지 */}
        <div className="flex border-b border-gray-200">
          <LabelCol>
            <span className="text-sm font-medium text-gray-700">쇼핑몰 주요 공지</span>
          </LabelCol>
          <ContentCol>
            <Toggle on={shopOn} onChange={() => setShopOn(!shopOn)} />
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신 그룹</span>
              <GroupSelect />
              <AddBtn />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신인</span>
              <AssignBtn />
              <Tag name="슬테스트" />
            </div>
          </ContentCol>
        </div>

        {/* 오늘 매출 브리핑 */}
        <div className="flex border-b border-gray-200">
          <LabelCol>
            <span className="text-sm font-medium text-gray-700">오늘 매출 브리핑</span>
            <SampleBtn />
          </LabelCol>
          <ContentCol>
            <Toggle on={todayOn} onChange={() => setTodayOn(!todayOn)} />
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">메시지 발송</span>
              <span className="text-xs text-gray-600">매일</span>
              <TimeSelect />
              <AddBtn />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신 그룹</span>
              <GroupSelect />
              <AddBtn />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신인</span>
              <AssignBtn />
              <Tag name="슬테스트" />
            </div>
          </ContentCol>
        </div>

        {/* 어제 매출 브리핑 */}
        <div className="flex border-b border-gray-200">
          <LabelCol>
            <span className="text-sm font-medium text-gray-700">어제 매출 브리핑</span>
            <SampleBtn />
          </LabelCol>
          <ContentCol>
            <Toggle on={yestOn} onChange={() => setYestOn(!yestOn)} />
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">메시지 발송</span>
              <span className="text-xs text-gray-600">매일</span>
              <TimeSelect />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신 그룹</span>
              <GroupSelect defaultValue="댕댕이모임" />
              <AddBtn />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신인</span>
              <AssignBtn />
              <Tag name="슬테스트" />
              <Tag name="솔2" />
            </div>
          </ContentCol>
        </div>

        {/* 지난주 매출 및 전환율 낮은 상품 */}
        <div className="flex border-b border-gray-200">
          <LabelCol>
            <span className="text-sm font-medium text-gray-700 leading-snug">지난주 매출 및 전환율 낮은 상품</span>
            <SampleBtn />
          </LabelCol>
          <ContentCol>
            <Toggle on={weekOn} onChange={() => setWeekOn(!weekOn)} />
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">메시지 발송</span>
              <span className="text-xs text-gray-600">매주 월요일</span>
              <TimeSelect />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신 그룹</span>
              <GroupSelect />
              <AddBtn />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신인</span>
              <AssignBtn />
              <Tag name="솔2" />
            </div>
          </ContentCol>
        </div>

        {/* 어제의 CRM 지표 브리핑 (하이라이트) */}
        <div className="flex border-b border-[#ef4444] border-2 relative">
          <LabelCol highlight>
            <span className="text-sm font-medium text-[#ef4444] leading-snug">어제의 CRM 지표 브리핑</span>
            <SampleBtn />
          </LabelCol>
          <ContentCol>
            <Toggle on={crmBriefOn} onChange={() => setCrmBriefOn(!crmBriefOn)} />
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">메시지 발송</span>
              <span className="text-xs text-gray-600">매일</span>
              <TimeSelect defaultHour="16" defaultMin="10" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신 그룹</span>
              <GroupSelect defaultValue="담당자 그룹 선택" />
              <AddBtn />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신인</span>
              <AssignBtn />
              <Tag name="임재림" />
            </div>
          </ContentCol>
        </div>

        {/* CRM 알림 */}
        <div className="flex">
          <LabelCol>
            <span className="text-sm font-medium text-gray-700">CRM 알림</span>
          </LabelCol>
          <ContentCol>
            <Toggle on={crmAlertOn} onChange={() => setCrmAlertOn(!crmAlertOn)} />
            <div className="flex items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신 그룹</span>
              <GroupSelect defaultValue="담당자 그룹 선택" />
              <AddBtn />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-xs text-gray-500 shrink-0">알림 수신인</span>
              <AssignBtn />
            </div>
          </ContentCol>
        </div>

      </div>

      {/* 하단 버튼 */}
      <div className="mt-6 flex justify-end">
        <button className="rounded-lg bg-[#3a3f45] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2d3138] transition-colors">
          변경 사항 적용
        </button>
      </div>
    </div>
  );
}
