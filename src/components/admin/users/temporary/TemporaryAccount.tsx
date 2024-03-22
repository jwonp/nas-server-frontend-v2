import TemporaryAccountInput from "@/components/admin/users/temporary/TemporaryAccountInput";
import TemporaryAccountList from "@/components/admin/users/temporary/TemporaryAccountList";


const TemporaryAccount = () => {
  return (
    <div>
      <section className="lg:grid lg:grid-cols-adminTemporaryAccount p-4 gap-2 ">
        <TemporaryAccountInput />
        <TemporaryAccountList />
      </section>
    </div>
  );
};

export default TemporaryAccount;
