import TemporaryAccountInput from "@/components/Admin/Temporary/TemporaryAccountInput";
import TemporaryAccountList from "@/components/Admin/Temporary/TemporaryAccountList";
const TemporaryAccount = () => {
  return (
    <div className="lg:grid lg:grid-cols-adminTemporaryAccount p-4 gap-2 ">
      <TemporaryAccountInput />
      <TemporaryAccountList />
    </div>
  );
};

export default TemporaryAccount;
