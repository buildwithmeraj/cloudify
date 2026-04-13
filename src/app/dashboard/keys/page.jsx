import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Link href="/dashboard/keys/cloudinary" className="btn mt-6">
        Cloudinary Keys
      </Link>
      <Link href="/dashboard/keys/public" className="btn mt-6">
        Public Keys
      </Link>
    </div>
  );
};

export default page;
