import { Header } from "@/modules/Header";
import { GetServerSideProps } from "next";
import { IProjectStatusResponse } from "@/types/responses/git.types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface IHomePage {
  projects: IProjectStatusResponse[];
}

export default function Home({ projects }: IHomePage) {
  async function updateProject() {
    // ...
  }

  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col col-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Path</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, projectIndex) => (
                  <tr key={projectIndex}>
                    <th scope="row">{project.name}</th>
                    <td className={"text-mono"}>{project.path}</td>
                    <td className={"text-mono"}>
                      <div style={{ height: "10rem", overflow: "scroll" }}>
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={"json"}
                          showLineNumbers
                          wrapLines={true}
                        >
                          {JSON.stringify(project.status, null, 2)}
                        </SyntaxHighlighter>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary text-nowrap"
                      >
                        🚀 Deploy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const pathname = "/api/git/get-all-projects";

  const response = await fetch(`${protocol}://${host}${pathname}`);
  const projects = await response.json();

  return {
    props: { projects },
  };
};
