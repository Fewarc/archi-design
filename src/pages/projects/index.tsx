import { NextPage } from "next";
import { GetSessionParams, getSession } from "next-auth/react";

const Projects: NextPage = () => {
  return (
    <div>PROJECTS</div>
  )
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {session}
  }
}

export default Projects;