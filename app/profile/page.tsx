import { withSessionSsr } from "@/middleware";

export default function Profile({ user }: { user: any }) {
  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/log-in",
        permanent: false,
      },
    };
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return {
    props: {
      user: profile,
    },
  };
});
