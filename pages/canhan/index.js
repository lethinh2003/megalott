import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import LoadingBox from "../../components/homePage/LoadingBox";
import AccountInfo from "../../components/user/AccountInfo";
import AccountMenu from "../../components/user/AccountMenu";
import { setBalance } from "../../redux/actions/balance";
const CaNhan = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);
  const callDataApi = async (account) => {
    if (!account) {
      return undefined;
    }
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/nguoidung?taiKhoan=${account}`);
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-detail-user", session ? session.user.taiKhoan : null],
    () => callDataApi(session ? session.user.taiKhoan : null),
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
  const { data, isLoading, isFetching, isError: isErrorQuery, error } = getListQuery;
  useEffect(() => {
    if (data && data.data) {
      dispatch(setBalance(data.data.money));
    }
  }, [data]);

  return (
    <>
      {isLoading && <LoadingBox isLoading={isLoading} />}
      <Layout>
        {!isLoading && data && (
          <>
            <AccountInfo user={data?.data} />
            <AccountMenu />
          </>
        )}
      </Layout>
    </>
  );
};

export default CaNhan;
