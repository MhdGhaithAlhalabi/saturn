import React from "react";
import { usePage } from "@inertiajs/react";

const withAuthorization = (WrappedComponent, requiredPermissions) => {
  return (props) => {
    const { auth } = usePage().props;

    const hasPermission = requiredPermissions.every((permission) =>
      auth.permissions.includes(permission)
    );

    if (!hasPermission) {
      return <div>Unauthorized</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;
