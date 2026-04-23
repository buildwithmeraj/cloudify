"use client";

import React from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

const SectionCard = ({ title, description, children }) => (
  <section className="space-y-3 rounded-2xl border border-base-300 p-5 bg-base-100">
    <div className="space-y-1">
      <h2 className="text-xl font-semibold">{title}</h2>
      {description ? (
        <p className="text-base-content/70">{description}</p>
      ) : null}
    </div>
    {children}
  </section>
);

const EndpointTable = ({ headers, rows, baseUrl }) => {
  const copyEndpointUrl = async (endpoint) => {
    const fullUrl = `${baseUrl}${endpoint}`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = fullUrl;
        tempInput.setAttribute("readonly", "");
        tempInput.style.position = "absolute";
        tempInput.style.left = "-9999px";
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      toast.success("URL endpoint copied");
    } catch (error) {
      toast.error("Failed to copy URL endpoint:");
    }
  };

  return (
    <div className="overflow-x-auto border border-base-300 rounded-xl">
      <table className="table table-zebra">
        <thead className="bg-base-300">
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.method}-${row.endpoint}-${index}`}>
              <td>{row.method}</td>
              <td className="font-mono text-xs md:text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span>{row.endpoint}</span>
                  <button
                    type="button"
                    className="btn btn-xs btn-info btn-soft whitespace-nowrap"
                    onClick={() => copyEndpointUrl(row.endpoint)}
                  >
                    <FiCopy />
                  </button>
                </div>
              </td>
              <td>{row.auth}</td>
              <td>{row.input}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ExampleBlock = ({ title, code }) => (
  <div className="space-y-2">
    <p className="font-medium">{title}</p>
    <pre className="bg-base-200 rounded-xl p-4 overflow-x-auto text-sm">
      {code}
    </pre>
  </div>
);

const Docs = () => {
  const baseUrl = (
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  ).replace(/\/+$/, "");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Cloudify API Docs</h1>
        <p className="text-base-content/70">
          Beginner-friendly guide for the backend at{" "}
          <span className="font-mono">{baseUrl}</span>.
        </p>
        <p className="text-base-content/70 text-sm">
          Current provider: Cloudinary. You can manage private auth tokens,
          public keys, and files from these endpoints.
        </p>
      </div>

      <SectionCard
        title="Before You Start"
        description="You will use two different tokens in this API."
      >
        <div className="space-y-2 text-sm text-base-content/80">
          <p>
            <strong>Auth token</strong>: returned from register/login. Use this
            for account-level routes (user, logout, keys management).
          </p>
          <p>
            <strong>Public key</strong>: generated from{" "}
            <span className="font-mono">/api/keys/public</span>. Use this for
            file routes (upload/list/delete).
          </p>
        </div>
        <ExampleBlock
          title="Example header format"
          code={`Authorization: Bearer <TOKEN_HERE>`}
        />
      </SectionCard>

      <SectionCard
        title="Quick Start Flow"
        description="If this is your first time, follow these steps in order."
      >
        <ol className="list-decimal ml-5 space-y-1 text-sm text-base-content/80">
          <li>Register or login to get an auth token.</li>
          <li>
            Add a Cloudinary account in{" "}
            <span className="font-mono">/api/keys/cloudinary</span>.
          </li>
          <li>
            Create a public key in{" "}
            <span className="font-mono">/api/keys/public</span>.
          </li>
          <li>Use that public key to upload/list/delete files.</li>
        </ol>
      </SectionCard>

      <SectionCard
        title="Auth"
        description="Create an account, login, inspect your user, and logout."
      >
        <EndpointTable
          baseUrl={baseUrl}
          headers={["Method", "Endpoint", "Auth", "Input"]}
          rows={[
            {
              method: "POST",
              endpoint: "/api/auth/register",
              auth: "None",
              input: "JSON: name, email, password, password_confirmation",
            },
            {
              method: "POST",
              endpoint: "/api/auth/login",
              auth: "None",
              input: "JSON: email, password",
            },
            {
              method: "GET",
              endpoint: "/api/user",
              auth: "Bearer auth-token",
              input: "-",
            },
            {
              method: "POST",
              endpoint: "/api/logout",
              auth: "Bearer auth-token",
              input: "-",
            },
          ]}
        />
        <ExampleBlock
          title="Example: register"
          code={`curl -X POST "${baseUrl}/api/auth/register" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name":"Alex",
    "email":"alex@example.com",
    "password":"Password123!",
    "password_confirmation":"Password123!"
  }'

# Response includes: user + token`}
        />
      </SectionCard>

      <SectionCard
        title="Cloudinary Keys (Requires Auth)"
        description="Store Cloudinary credentials for the logged-in user."
      >
        <EndpointTable
          baseUrl={baseUrl}
          headers={["Method", "Endpoint", "Auth", "Input"]}
          rows={[
            {
              method: "GET",
              endpoint: "/api/keys/cloudinary",
              auth: "Bearer auth-token",
              input: "-",
            },
            {
              method: "POST",
              endpoint: "/api/keys/cloudinary",
              auth: "Bearer auth-token",
              input:
                "JSON: name (cloud_name), key (api_key), secret (api_secret)",
            },
            {
              method: "GET",
              endpoint: "/api/keys/cloudinary/{id}",
              auth: "Bearer auth-token",
              input: "-",
            },
            {
              method: "PUT",
              endpoint: "/api/keys/cloudinary/{id}",
              auth: "Bearer auth-token",
              input: "JSON: name",
            },
            {
              method: "DELETE",
              endpoint: "/api/keys/cloudinary/{id}",
              auth: "Bearer auth-token",
              input: "-",
            },
          ]}
        />
        <ExampleBlock
          title="Example: add Cloudinary key"
          code={`curl -X POST "${baseUrl}/api/keys/cloudinary" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <AUTH_TOKEN>" \\
  -d '{
    "name":"your_cloud_name",
    "key":"your_api_key",
    "secret":"your_api_secret"
  }'`}
        />
      </SectionCard>

      <SectionCard
        title="Public Keys (Requires Auth)"
        description="Create project-level public keys to access file endpoints safely."
      >
        <EndpointTable
          baseUrl={baseUrl}
          headers={["Method", "Endpoint", "Auth", "Input"]}
          rows={[
            {
              method: "GET",
              endpoint: "/api/keys/public",
              auth: "Bearer auth-token",
              input: "-",
            },
            {
              method: "POST",
              endpoint: "/api/keys/public",
              auth: "Bearer auth-token",
              input: "JSON: name",
            },
            {
              method: "GET",
              endpoint: "/api/keys/public/{id}",
              auth: "Bearer auth-token",
              input: "-",
            },
            {
              method: "PUT",
              endpoint: "/api/keys/public/{id}",
              auth: "Bearer auth-token",
              input: "JSON: name",
            },
            {
              method: "DELETE",
              endpoint: "/api/keys/public/{id}",
              auth: "Bearer auth-token",
              input: "-",
            },
          ]}
        />
        <ExampleBlock
          title="Example: create a public key"
          code={`curl -X POST "${baseUrl}/api/keys/public" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <AUTH_TOKEN>" \\
  -d '{"name":"main"}'

# Response includes generated "key" value (save it).`}
        />
      </SectionCard>

      <SectionCard
        title="Cloudinary Files (Use Public Key)"
        description="Upload, list, and delete files by logical group name."
      >
        <EndpointTable
          baseUrl={baseUrl}
          headers={["Method", "Endpoint", "Auth", "Input"]}
          rows={[
            {
              method: "POST",
              endpoint: "/api/cloudinary/upload",
              auth: "Bearer public_key",
              input: "multipart/form-data: name, images[]",
            },
            {
              method: "GET",
              endpoint: "/api/cloudinary/files",
              auth: "Bearer public_key",
              input: "query: name",
            },
            {
              method: "DELETE",
              endpoint: "/api/cloudinary/files",
              auth: "Bearer public_key",
              input:
                "JSON: name, files[] (upload IDs from list/upload response)",
            },
          ]}
        />
        <div className="text-sm text-base-content/80 space-y-1">
          <p>Allowed upload types: jpg, jpeg, png, webp, gif, svg, avif.</p>
          <p>
            Files are uploaded under Cloudinary folder:
            <span className="font-mono"> uploads/&lt;name&gt; </span>
          </p>
        </div>
        <ExampleBlock
          title="Example: upload images"
          code={`curl -X POST "${baseUrl}/api/cloudinary/upload" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer <PUBLIC_KEY>" \\
  -F "name=main" \\
  -F "images[]=@/path/to/photo-1.jpg" \\
  -F "images[]=@/path/to/photo-2.png"`}
        />
        <ExampleBlock
          title="Example: list files"
          code={`curl -X GET "${baseUrl}/api/cloudinary/files?name=main" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer <PUBLIC_KEY>"`}
        />
        <ExampleBlock
          title="Example: delete files"
          code={`curl -X DELETE "${baseUrl}/api/cloudinary/files" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <PUBLIC_KEY>" \\
  -d '{"name":"main","files":[1,2,3]}'`}
        />
      </SectionCard>

      <SectionCard
        title="Common Errors"
        description="Quick meanings of errors beginners usually hit first."
      >
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table table-zebra">
            <thead className="bg-base-300">
              <tr>
                <th>Status</th>
                <th>Meaning</th>
                <th>What to check</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>401</td>
                <td>Invalid token</td>
                <td>Use the right token type and include `Bearer` prefix.</td>
              </tr>
              <tr>
                <td>422</td>
                <td>Validation failed</td>
                <td>
                  Missing required fields like `name`, `images[]`, or bad
                  format.
                </td>
              </tr>
              <tr>
                <td>507</td>
                <td>No usable Cloudinary storage</td>
                <td>Add or fix Cloudinary credentials in account keys.</td>
              </tr>
              <tr>
                <td>404</td>
                <td>Endpoint not found</td>
                <td>
                  Check path starts with `/api/...` and method is correct.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

export default Docs;
