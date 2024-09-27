import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    //쿼리키, 전송하는 모든 요청에는 쿼리 키가 있음
    //내부에서 키를 이용해 요청으로 생성된 데이터를 캐시 처리함
    //=> 동일 요청시 이전 요청 응답을 재사용 => 사용자에게 데이터를 더 빨리 제공 할 수 있게 해줌
    queryKey: ["events"],
    //쿼리함수, 실제 요청을 전송할 때 실행할 실제 코드를 정의
    queryFn: fetchEvents,
    staleTime: 5000,
    //gcTime:
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
