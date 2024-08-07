import LoginForm from '../components/LoginForm';

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <LoginForm />
      </main>
    </div>
  );
}
