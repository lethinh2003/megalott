import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Layout from "../components/Layout";
const Logout = () => {
  const { data: session, status } = useSession();
  const handleLogOut = async () => {
    const data = await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };
  useEffect(() => {
    if (session) {
      handleLogOut();
    }
  }, [session]);

  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default Logout;
export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};
