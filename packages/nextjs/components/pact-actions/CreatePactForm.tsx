import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { RainbowKitCustomConnectButton } from "../scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CreatePactForm = () => {
  const router = useRouter();
  const today = new Date();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pactSize, setPactSize] = useState("2");
  const [timeSpan, setTimeSpan] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [deposit, setDeposit] = useState("0.0001");
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

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "PiggyContract",
    functionName: "createPact",
    args: [
      title,
      desc,
      BigInt(pactSize),
      BigInt(parseInt(timeSpan) * 86400),
      BigInt(Math.floor(new Date(startDate).getTime() / 1000) || 0),
      BigInt((parseFloat(deposit) || 0) * 10 ** 18),
    ],
    value: `${parseFloat(deposit) || 0}`, // value of eth to send with transaction
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const handleClick = () => {
    if (canSubmit) {
      writeAsync();
      router.push("/PactIndex");
    }
  };

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let currDesc = desc;
    setDesc(e.target.value);
    currDesc = e.target.value;
    if (e.target.value.length === 0) {
      setErrors({ ...errors, desc: "Description cannot be empty" });
    } else {
      setErrors({ ...errors, desc: "" });
    }

    if (
      title.length &&
      currDesc.length &&
      pactSize &&
      !(parseInt(pactSize) > 10) &&
      !(parseInt(pactSize) < 2) &&
      startDate &&
      new Date(startDate) > today &&
      !(parseInt(timeSpan) < 1) &&
      timeSpan !== "" &&
      !(parseFloat(deposit) < 0.0001) &&
      deposit !== ""
    ) {
      setCanSubmit(true);
      console.log("can submit");
    } else {
      setCanSubmit(false);
      console.log("has issues");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    let currtitle = title;
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
      // case "desc":
      //   setDesc(e.target.value);
      //   currdesc = e.target.value;
      //   if (e.target.value.length === 0) {
      //     // setCanSubmit(false);
      //     setErrors({ ...errors, desc: "Description cannot be empty" });
      //   } else {
      //     setErrors({ ...errors, desc: "" });
      //   }
      //   break;
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
        currdeposit = parseFloat(e.target.value).toFixed(4);
        const currDep = parseFloat(currdeposit);
        if (currDep <= 0) {
          if (e.target.value.length > currdeposit.length) {
            setDeposit(currdeposit);
            console.log("shouldnt you just be 0 ;-;");
          } else {
            setDeposit(e.target.value);
          }
          // setCanSubmit(false);
          setErrors({ ...errors, deposit: "Deposit must be greater than 0" });
          // } else if (e.target.value[e.target.value.length - 1] === ".") {
          // setCanSubmit(false);
        } else if (e.target.value === "") {
          setDeposit(e.target.value);
          setErrors({ ...errors, deposit: "Deposit cannot be blank" });
          // setCanSubmit(false);
        } else if (e.target.value.length > currdeposit.length) {
          // setDeposit(currdeposit);
        } else {
          setDeposit(e.target.value);
          setErrors({ ...errors, deposit: "" });
        }
        console.log(e.target.value, currDep, currdeposit, deposit);
        break;
    }
    // testSubmit();

    if (
      currtitle.length &&
      desc.length &&
      currpactSize &&
      !(parseInt(currpactSize) > 10) &&
      !(parseInt(currpactSize) < 2) &&
      currstartDate &&
      new Date(currstartDate) > today &&
      !(parseInt(currtimeSpan) < 1) &&
      currtimeSpan !== "" &&
      !(parseFloat(currdeposit) < 0.0001) &&
      currdeposit !== ""
    ) {
      setCanSubmit(true);
      // console.log("can submit");
    } else {
      setCanSubmit(false);
      // console.log("has issues");
    }

    // console.log(e.target.value, typeof e.target.value);
  };

  return (
    <div className="auth-bg">
      <div className="create-pact-container">
        <h2>Create a pact</h2>
        <div id="separator" />
        <div className="form-content">
          <div className="form-left-side">
            <label>
              <span>Title</span>
              <input
                type="text"
                value={title}
                onChange={e => handleChange(e, "title")}
                placeholder="e.g. Do 30 push-ups every day"
              />
            </label>
            <p className="error-msg">{errors?.title}</p>

            <label>
              <span>Description</span>
              <textarea
                className="desc-input"
                value={desc}
                onChange={e => handleTextArea(e)}
                placeholder="Talk about how participants can verify their participation in the pact. For example, 'record videos of push-ups'"
              />
            </label>
            <p className="error-msg">{errors?.desc}</p>
          </div>

          <div className="form-right-side">
            <label>
              <span>Number of participants</span>
              <input
                type="number"
                value={pactSize}
                min="2"
                max="10"
                step="1"
                onChange={e => handleChange(e, "pactSize")}
                placeholder="How many people would you like to join your pact?"
              />
            </label>
            <p className="error-msg">{errors?.pactSize}</p>

            <label>
              <span>Duration</span>
              <input
                type="number"
                step="1"
                min="1"
                value={timeSpan}
                onChange={e => handleChange(e, "timeSpan")}
                placeholder="How long will this pact last?"
              />
            </label>
            <p className="error-msg">{errors?.timeSpan}</p>

            <label>
              <span>Start date</span>
              <input type="date" value={startDate} onChange={e => handleChange(e, "startDate")} />
            </label>
            <p className="error-msg">{errors?.startDate}</p>

            {/* <label>
              <span>Check-in method</span>
              <input type="text" value={checkIn} onChange={e => handleChange(e, "checkIn")} />
            </label>
            <p className="error-msg">{errors?.checkIn}</p> */}

            <label>
              <span>Deposit amount</span>
              <input
                type="number"
                step="0.0001"
                min="0.0001"
                value={deposit}
                onChange={e => handleChange(e, "deposit")}
                placeholder="Each participant's ETH commitment to this pact"
              />
            </label>
            <p className="error-msg">{errors?.deposit}</p>
          </div>
        </div>

        <RainbowKitCustomConnectButton />

        <button className={canSubmit ? "" : "disabled-btn"} onClick={handleClick} disabled={isLoading}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreatePactForm;
