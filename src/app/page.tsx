import { UserList } from "./_components/user-list/user-list";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <UserList />
        </div>
      </div>
    </main>
  );
}
