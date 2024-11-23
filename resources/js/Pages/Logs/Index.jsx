import { usePage } from "@inertiajs/react";
import LogDataTablePage from "../../Components/Tables/LogDataTable";

const LogsIndex = () => {
  const { logs } = usePage().props; // الحصول على السجلات المرسلة من Laravel

  return (
<>
    <LogDataTablePage {...logs}></LogDataTablePage>
  </>  
  );
  
};

export default LogsIndex;
