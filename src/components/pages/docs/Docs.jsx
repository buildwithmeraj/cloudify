import React from "react";

const Docs = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Cloudify API Docs</h1>
        <p className="text-base-content/70 mt-2">
          Simple reference for the current backend at{" "}
          <span className="font-mono">{baseUrl}</span>.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cloudinary Files (Public Key)</h2>
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table table-zebra">
            <thead className="bg-base-300">
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Auth</th>
                <th>Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>POST</td>
                <td>/api/cloudinary/upload</td>
                <td>Bearer public_key</td>
                <td>multipart: name, images[]</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/api/cloudinary/files</td>
                <td>Bearer public_key</td>
                <td>query: name</td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/api/cloudinary/files</td>
                <td>Bearer public_key</td>
                <td>json: name, files[]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Auth</h2>
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table table-zebra">
            <thead className="bg-base-300">
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Auth</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>POST</td>
                <td>/api/auth/register</td>
                <td>None</td>
                <td>name, email, password, password_confirmation</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/api/auth/login</td>
                <td>None</td>
                <td>email, password</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/api/user</td>
                <td>Bearer auth-token</td>
                <td>-</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/api/logout</td>
                <td>Bearer auth-token</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          Cloudinary Keys (Requires Auth)
        </h2>
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table table-zebra">
            <thead className="bg-base-300">
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/api/keys/cloudinary</td>
                <td>-</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/api/keys/cloudinary</td>
                <td>name, key, secret</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/api/keys/cloudinary/{`{id}`}</td>
                <td>-</td>
              </tr>
              <tr>
                <td>PUT</td>
                <td>/api/keys/cloudinary/{`{id}`}</td>
                <td>name</td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/api/keys/cloudinary/{`{id}`}</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Public Keys (Requires Auth)</h2>
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table table-zebra">
            <thead className="bg-base-300">
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/api/keys/public</td>
                <td>-</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/api/keys/public</td>
                <td>name</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/api/keys/public/{`{id}`}</td>
                <td>-</td>
              </tr>
              <tr>
                <td>PUT</td>
                <td>/api/keys/public/{`{id}`}</td>
                <td>name</td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/api/keys/public/{`{id}`}</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Examples</h2>
        <pre className="bg-base-200 rounded-xl p-4 overflow-x-auto text-sm">
          {`# List files
curl -X GET "${baseUrl}/api/cloudinary/files?name=main" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer <PUBLIC_KEY>"

# Delete files
curl -X DELETE "${baseUrl}/api/cloudinary/files" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <PUBLIC_KEY>" \\
  -d '{"name":"main","files":[1,2,3]}'`}
        </pre>
      </section>
    </div>
  );
};

export default Docs;
