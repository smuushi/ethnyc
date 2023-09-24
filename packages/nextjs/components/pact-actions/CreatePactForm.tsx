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

  const today = new Date();
  // today.setDate(today.getDate() + 1);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pactSize, setPactSize] = useState("2");
  const [timeSpan, setTimeSpan] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [deposit, setDeposit] = useState("1");
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
    let currtitle = title;
    let currdesc = desc;
    let currpactSize = pactSize;
    let currtimeSpan = timeSpan;
    let currcheckIn = checkIn;
    let currdeposit = deposit;
    let currstartDate = startDate;

    switch (field) {
      case "title":
        setTitle(e.target.value);
        currtitle = e.target.value;
        if (e.target.value.length === 0) {
          // setCanSubmit(false);
          setErrors({ ...errors, title: "Title cannot be empty" });
        } else {
          setErrors({ ...errors, title: "" });
        }
        break;
      case "desc":
        setDesc(e.target.value);
        currdesc = e.target.value;
        if (e.target.value.length === 0) {
          // setCanSubmit(false);
          setErrors({ ...errors, desc: "Description cannot be empty" });
        } else {
          setErrors({ ...errors, desc: "" });
        }
        break;
      case "pactSize":
        const currVal = parseInt(e.target.value);
        currpactSize = e.target.value;
        if (currVal > 10 || currVal < 2) {
          setPactSize(e.target.value);
          // setCanSubmit(false);
          setErrors({ ...errors, pactSize: "Must be 2 to 10 participants" });
        } else if (e.target.value[e.target.value.length - 1] === ".") {
          // setCanSubmit(false);
        } else if (e.target.value === "") {
          setPactSize(e.target.value);
          setErrors({ ...errors, pactSize: "Number of participants cannot be blank" });
          // setCanSubmit(false);
        } else {
          setPactSize(e.target.value);
          // setCanSubmit(true);
          setErrors({ ...errors, pactSize: "" });
        }
        break;
      case "timeSpan":
        const currTimeSpan = parseInt(e.target.value);
        currtimeSpan = e.target.value;
        if (currTimeSpan < 1) {
          setTimeSpan(e.target.value);
          // setCanSubmit(false);
          setErrors({ ...errors, timeSpan: "Time span must be greater than 1" });
        } else if (e.target.value[e.target.value.length - 1] === ".") {
          // setCanSubmit(false);
        } else if (e.target.value === "") {
          setTimeSpan(e.target.value);
          setErrors({ ...errors, timeSpan: "Time span cannot be blank" });
          // setCanSubmit(false);
        } else {
          setTimeSpan(e.target.value);
          setErrors({ ...errors, timeSpan: "" });
        }
        break;
      case "startDate":
        // today.getTime();
        const newDate = new Date(e.target.value);
        currstartDate = e.target.value;
        newDate.setDate(newDate.getDate() + 1);
        setStartDate(e.target.value);
        if (newDate < today) {
          // setCanSubmit(false);
          setErrors({ ...errors, startDate: "Start date must be after today" });
        } else {
          setErrors({ ...errors, startDate: "" });
          setCanSubmit(true);
        }
        break;
      case "checkIn":
        setCheckIn(e.target.value);
        currcheckIn = e.target.value;
        if (e.target.value.length === 0) {
          // setCanSubmit(false);
          setErrors({ ...errors, checkIn: "Check in cannot be empty" });
        } else {
          setErrors({ ...errors, checkIn: "" });
          // setCanSubmit(true);
        }
        break;
      case "deposit":
        const currDep = parseInt(e.target.value);
        currdeposit = e.target.value;
        if (currDep < 1) {
          setDeposit(e.target.value);
          // setCanSubmit(false);
          setErrors({ ...errors, deposit: "Deposit must be greater than 0" });
        } else if (e.target.value[e.target.value.length - 1] === ".") {
          // setCanSubmit(false);
        } else if (e.target.value === "") {
          setDeposit(e.target.value);
          setErrors({ ...errors, deposit: "Deposit cannot be blank" });
          // setCanSubmit(false);
        } else {
          setDeposit(e.target.value);
          setErrors({ ...errors, deposit: "" });
        }
        break;
    }
    // testSubmit();

    if (
      currtitle.length &&
      currdesc.length &&
      currpactSize &&
      !(parseInt(currpactSize) > 10) &&
      !(parseInt(currpactSize) < 2) &&
      currstartDate &&
      new Date(currstartDate) > today &&
      !(parseInt(currtimeSpan) < 1) &&
      currtimeSpan !== "" &&
      currcheckIn.length &&
      !(parseInt(currdeposit) < 1) &&
      currdeposit !== ""
    ) {
      setCanSubmit(true);
      console.log("can submit");
    } else {
      setCanSubmit(false);
      console.log("has issues");
    }

    console.log(e.target.value, typeof e.target.value);
  };

  const testSubmit = () => {
    // let hasIssue = false;
    // let values = Object.values(errors);
    // values.forEach(element => {
    //   if (element !== '') hasIssue = true;
    //   console.log(element);
    // });
    // if (canSubmit && !hasIssue) console.log('everything is okay')
    // else console.log('problems')
    if (
      title.length &&
      desc.length &&
      pactSize.length &&
      !(parseInt(pactSize) > 10) &&
      !(parseInt(pactSize) < 2) &&
      startDate &&
      new Date(startDate) > today &&
      !(parseInt(timeSpan) < 1) &&
      timeSpan.length &&
      checkIn.length &&
      !(parseInt(deposit) < 1) &&
      deposit.length
    ) {
      setCanSubmit(true);
      console.log("can submit");
    } else {
      setCanSubmit(false);
      console.log("has issues");
    }
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
          <input type="number" value={pactSize} min="2" max="10" step="1" onChange={e => handleChange(e, "pactSize")} />
        </label>
        <p>{errors?.pactSize}</p>

        <label>
          Time span
          <input type="number" step="1" min="1" value={timeSpan} onChange={e => handleChange(e, "timeSpan")} />
        </label>
        <p>{errors?.timeSpan}</p>

        <label>
          Start date
          <input type="date" value={startDate} onChange={e => handleChange(e, "startDate")} />
        </label>
        <p>{errors?.startDate}</p>

        <label>
          Check-in method
          <input type="text" value={checkIn} onChange={e => handleChange(e, "checkIn")} />
        </label>
        <p>{errors?.checkIn}</p>

        <label>
          Deposit amount
          <input type="number" step="1" min="1" value={deposit} onChange={e => handleChange(e, "deposit")} />
        </label>
        <p>{errors?.deposit}</p>
      </div>
      <button
      // onClick={() => writeAsync}
      // disabled={isLoading}
      >
        {canSubmit ? "Create Your Pact" : "nope"}
      </button>
    </div>
  );
};

export default CreatePactForm;
