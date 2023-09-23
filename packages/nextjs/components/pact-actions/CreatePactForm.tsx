import { ChangeEvent, useState } from "react";

// import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CreatePactForm = () => {
  // const { writeAsync, isLoading } = useScaffoldContractWrite({
  //   contractName: "",
  //   functionName: "",
  //   args: [],
  //   value: "", // value of eth to send with transaction
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //   }
  // });

  // const today = new Date();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pactSize, setPactSize] = useState(0);
  // const [timeSpan, setTimeSpan] = useState(0);
  // const [startDate, setStartDate] = useState(today);
  const [checkIn, setCheckIn] = useState("");
  // const [deposit, setDeposit] = useState(0);
  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    pactSize: "",
    timeSpan: "",
    startDate: "",
    checkIn: "",
    deposit: "",
  });
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    switch (field) {
      case "title":
        setTitle(e.target.value);
        if (e.target.value.length === 0) {
          setCanSubmit(false);
          setErrors({ ...errors, title: "Title cannot be empty" });
        } else {
          setErrors({ ...errors, title: "" });
          setCanSubmit(true);
        }
        break;
      case "desc":
        setDesc(e.target.value);
        if (e.target.value.length === 0) {
          setCanSubmit(false);
          setErrors({ ...errors, desc: "Description cannot be empty" });
        } else {
          setErrors({ ...errors, desc: "" });
          setCanSubmit(true);
        }
        break;
      case "pactSize":
        const currVal = parseInt(e.target.value);
        setPactSize(currVal);
        if (currVal < 2) {
          setCanSubmit(false);
          setErrors({ ...errors, pactSize: "Must have at least 2 participants" });
        } else {
          setErrors({ ...errors, pactSize: "" });
          setCanSubmit(true);
        }
        break;
      // case "timeSpan":
      //   setTimeSpan(e.target.value);
      //   if (e.target.value === 0) {
      //     //   setCanSubmit(false);
      //     //   setErrors({...errors, 'timeSpan': 'Pact must last at least 1 day'})
      //   } else {
      //     setErrors({ ...errors, timeSpan: "" });
      //     setCanSubmit(true);
      //   }
      //   break;
      // case "startDate":
      //   setStartDate(e.target.value);
      //   if (new Date(e.target.value) < today) {
      //     setCanSubmit(false);
      //     setErrors({ ...errors, startDate: "Pact cannot start on a day in the past" });
      //     console.log(errors?.startDate);
      //   } else {
      //     setErrors({ ...errors, startDate: "" });
      //     setCanSubmit(true);
      //   }
      //   break;
      case "checkIn":
        setCheckIn(e.target.value);
        if (e.target.value.length === 0) {
          setCanSubmit(false);
          setErrors({ ...errors, checkIn: "Check in cannot be empty" });
        } else {
          setErrors({ ...errors, checkIn: "" });
          setCanSubmit(true);
        }
        break;
      // case "deposit":
      //   setDeposit(e.target.value);
      //   if (e.target.value === 0) {
      //     setCanSubmit(false);
      //     setErrors({ ...errors, deposit: "Deposit cannot be zero" });
      //   } else {
      //     setErrors({ ...errors, deposit: "" });
      //     setCanSubmit(true);
      //   }
      //   break;
    }
    console.log(e.target.value, typeof e.target.value);
  };

  const testSubmit = () => {
    if (canSubmit) console.log("its all good");
    else console.log("there are issues");
  };

  return (
    <div>
      <p>Create Pact Form</p>
      <div className="flex flex-col">
        <label>
          Title
          <input type="text" value={title} onChange={e => handleChange(e, "title")} />
        </label>
        <p>{errors?.title}</p>

        <label>
          Description
          <input type="text" value={desc} onChange={e => handleChange(e, "desc")} />
        </label>
        <p>{errors?.desc}</p>

        <label>
          Number of participants
          <input type="number" value={pactSize} onChange={e => handleChange(e, "pactSize")} />
        </label>
        <p>{errors?.pactSize}</p>

        {/* <label>
          Time span
          <input type="number" step="1" value={timeSpan} onChange={e => handleChange(e, "timeSpan")} />
        </label>
        <p>{errors?.timeSpan}</p> */}

        {/* <label>
          Start date
          <input type="date" value={startDate} onChange={e => handleChange(e, "startDate")} />
        </label>
        <p>{errors?.startDate}</p> */}

        <label>
          Check-in method
          <input type="text" value={checkIn} onChange={e => handleChange(e, "checkIn")} />
        </label>
        <p>{errors?.checkIn}</p>

        {/* <label>
          Deposit amount
          <input type="number" step="1" min="0" required value={deposit} onChange={e => handleChange(e, "deposit")} />
        </label>
        <p>{errors?.deposit}</p> */}
      </div>
      <button
        // onClick={() => writeAsync}
        onClick={testSubmit}
        // disabled={isLoading}
      >
        Create Your Pact
      </button>
    </div>
  );
};

export default CreatePactForm;
