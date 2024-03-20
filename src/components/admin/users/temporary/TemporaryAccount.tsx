import TemporaryAccountInput from "@/components/admin/users/temporary/TemporaryAccountInput";
import TemporaryAccountList from "@/components/admin/users/temporary/TemporaryAccountList";
import TempStorage from "./storage/TempStroage";

const TemporaryAccount = () => {
  return (
    <div>
      <section className="lg:grid lg:grid-cols-adminTemporaryAccount p-4 gap-2 ">
        <TemporaryAccountInput />
        <TemporaryAccountList />
      </section>
      <TempStorage />
    </div>
  );
};

export default TemporaryAccount;
