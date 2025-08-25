// src/api/mockData.js
// 간단한 인메모리 DB + 목업 응답

function uuid() {
    try { return crypto.randomUUID(); }
    catch { return `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
}

export function createMockDB() {
    // sessionId -> messages[]
    const store = new Map();

    // 샘플 히스토리(스샷에서 보던 ID들)
    const seedIds = [
        "some-unique-session-id-124",
        "some-unique-session-id-128",
        "7e155552-fc95-4299-ac06-17be2f4e105e",
        "some-unique-session-id-129",
        "some-unique-session-id-130",
    ];
    seedIds.forEach((id) => store.set(id, []));

    // 제주 3일 한식 목업 카드(스웨거 예시 스키마 맞춤)
    function jeju3daysKFood() {
        return [
            {
                day: 1,
                schedule: [
                    {
                        order: 1,
                        name: "우도 해양 공원",
                        type: "관광지",
                        address: "제주특별자치도 제주시 우도면 연평리 1-1",
                        latitude: 33.5063,
                        longitude: 126.9558,
                        description: "에메랄드빛 바다와 해안 산책로로 유명한 우도 대표 관광지.",
                        grade: "A",
                    },
                    {
                        order: 2,
                        name: "섭지코지",
                        type: "관광지",
                        address: "제주특별자치도 서귀포시 성산읍 고성리 62-3",
                        latitude: 33.4247,
                        longitude: 126.9278,
                        description: "깎아지른 해안 절벽과 등대 풍경이 멋진 산책 코스.",
                        grade: "A",
                    },
                    {
                        order: 3,
                        name: "제주 곰막밥상",
                        type: "식당",
                        address: "제주특별자치도 서귀포시 성산읍 성산리 산1-1",
                        latitude: 33.4592,
                        longitude: 126.942,
                        description: "싱싱한 회와 해산물 위주의 한식 코스가 인기.",
                        grade: "A",
                    },
                    {
                        order: 4,
                        name: "숙소",
                        type: "숙소",
                        address: "제주특별자치도 서귀포시 성산읍 시흥리 288-1",
                        latitude: 33.4491,
                        longitude: 126.9171,
                        description: "동쪽 이동 동선에 유리한 숙소 권역.",
                        grade: "A",
                    },
                ],
            },
            {
                day: 2,
                schedule: [
                    {
                        order: 1,
                        name: "애월 해안도로",
                        type: "관광지",
                        address: "제주특별자치도 제주시 애월읍 애월리 일대",
                        latitude: 33.4678,
                        longitude: 126.3221,
                        description: "카페와 포토스팟이 많은 서쪽 드라이브 코스.",
                        grade: "A",
                    },
                    {
                        order: 2,
                        name: "우진해장국 본점",
                        type: "식당",
                        address: "제주특별자치도 제주시 탑동로 11",
                        latitude: 33.5158,
                        longitude: 126.523,
                        description: "고사리 해장국으로 유명한 한식 맛집.",
                        grade: "A",
                    },
                    {
                        order: 3,
                        name: "한라수목원",
                        type: "관광지",
                        address: "제주특별자치도 제주시 수목원길 72",
                        latitude: 33.4746,
                        longitude: 126.4865,
                        description: "산책하기 좋고 주차 편한 도심 근교 명소.",
                        grade: "A",
                    },
                ],
            },
            {
                day: 3,
                schedule: [
                    {
                        order: 1,
                        name: "용머리해안",
                        type: "관광지",
                        address: "제주특별자치도 서귀포시 안덕면 사계리",
                        latitude: 33.2372,
                        longitude: 126.3139,
                        description: "현무암 주상절리와 파도 파노라마가 장관.",
                        grade: "A",
                    },
                    {
                        order: 2,
                        name: "네거리식당 본점",
                        type: "식당",
                        address: "제주특별자치도 서귀포시 서홍로 67",
                        latitude: 33.2497,
                        longitude: 126.5681,
                        description: "갈치조림/고등어조림 등 푸짐한 한식.",
                        grade: "A",
                    },
                    {
                        order: 3,
                        name: "카멜리아힐",
                        type: "관광지",
                        address: "제주특별자치도 서귀포시 안덕면 병악로 166",
                        latitude: 33.2899,
                        longitude: 126.3689,
                        description: "사계절 꽃구경과 산책로, 사진 찍기 좋음.",
                        grade: "A",
                    },
                ],
            },
        ];
    }

    function buildAssistant(content) {
        return { role: "assistant", content };
    }
    function buildUser(text) {
        return { role: "user", content: text };
    }

    // 간단한 룰: "제주" AND "3" AND "한식" 이 포함되면 일정 카드 응답
    function replyFor(text) {
        const t = String(text || "").replace(/\s/g, "");
        if (t.includes("제주") && t.includes("3") && (t.includes("한식") || t.includes("한끼")))
            return buildAssistant(jeju3daysKFood());
        return buildAssistant("아직 학습되지 않은 요청이에요. 예: '제주도 3일, 한식' 처럼 말해보세요!");
    }

    // 공개 API(목업용)
    return {
        uuid,
        listSessions() {
            return Array.from(store.keys());
        },
        getMessages(sessionId) {
            return store.get(sessionId) || [];
        },
        send({ sessionId, message }) {
            const id = sessionId || uuid();
            if (!store.has(id)) store.set(id, []);
            const bucket = store.get(id);

            // user push
            const userMsg = {
                role: message?.role || "user",
                content: message?.content,
                createdAt: new Date().toISOString(),
            };
            bucket.push(userMsg);

            // assistant reply
            const assistant = replyFor(message?.content);
            const botMsg = { ...assistant, createdAt: new Date().toISOString() };
            bucket.push(botMsg);

            return {
                sessionId: id,
                message: assistant,
            };
        },
    };
}