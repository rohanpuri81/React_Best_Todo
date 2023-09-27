import { useState } from "react";
import "./App.css";
import { sampData } from "./SampData";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

function App() {
  const [finalData, setFinalData] = useState(sampData);
  const [edit, setEdit] = useState(false);
  const [competed, setCompleted] = useState([]);
  const [data, setData] = useState({
    id: finalData.length + 1,
    task: "",
    desc: "",
    date: new Date(),
    strike: false,
  });

  return (
    <div>
      <div className="upper">
        <div className="upper-up a">
          <input
            type="text"
            required
            value={data.task}
            onChange={(e) => setData({ ...data, task: e.target.value })}
            placeholder="Enter task "
          />
          <textarea
            value={data.desc}
            required
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            style={{ resize: "none" }}
            placeholder="Enter task description"
          />
        </div>
        <div className="upper-low a">
          <input
            type="date"
            className="d"
            value={data.date}
            onChange={(e) => {
              setData({ ...data, date: e.target.value });
              console.log(data);
            }}
          />
          {edit ? (
            <button
              className="submit"
              onClick={() => {
                setFinalData(
                  finalData.filter((val) => {
                    if (val.id == data.id) {
                      val.task = data.task;
                      val.desc = data.desc;
                      let dt = data.date.split("-");
                      val.date = new Date(dt[0], dt[1], dt[2]);
                    }
                    return val;
                  })
                );
                setData({
                  id: "",
                  task: "",
                  desc: "",
                  date: new Date(),
                  strike: false,
                });
                setEdit(false);
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className="submit"
              onClick={(e) => {
                let dt = data.date.split("-");
                e.preventDefault();
                setFinalData([
                  ...finalData,
                  { ...data, date: new Date(dt[0], dt[1], dt[2]) },
                ]);
                setData({
                  id: finalData.length + 1,
                  task: "",
                  desc: "",
                  date: new Date(),
                  strike: false,
                });
                console.log(finalData);
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="lower">
        <h2 style={{ textAlign: "center", color: "grey" }}>Tasks</h2>
        <div className="tsks">
          {finalData.map((val, ind) => {
            return (
              <div className="ddatta" key={ind}>
                <div className="txt">
                  <h3 className={val.strike ? "strike" : ""}>{val.task}</h3>
                  <h4 className={val.strike ? "strike" : ""}>
                    {val.date.getDate()}-{val.date.getMonth()}-
                    {val.date.getFullYear()}
                  </h4>
                  <p className={val.strike ? "strike" : ""}>{val.desc}</p>
                  <p
                    style={{ color: "red" }}
                    className={new Date() > val.date ? "" : "expired"}
                  >
                    Due date expired !
                  </p>
                </div>
                <div className="btns">
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      display: "grid",
                      fontSize: "20px",
                      placeItems: "center",
                    }}
                    onClick={() => {
                      setFinalData(finalData.filter((e, v) => v != ind));
                    }}
                  >
                    <BsFillTrashFill />
                  </button>
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      setFinalData(
                        finalData.filter((v, i) => {
                          if (i == ind) {
                            v.strike = !v.strike;
                          }
                          return v;
                        })
                      );
                    }}
                  />
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      display: "grid",
                      fontSize: "20px",
                      placeItems: "center",
                    }}
                    onClick={() => {
                      setData({
                        id: val.id,
                        task: val.task,
                        desc: val.desc,
                        date: val.date,
                      });
                      setEdit(true);
                    }}
                  >
                    <BsFillPencilFill />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lower">
        <h2 style={{ textAlign: "center", color: "grey" }}>Competed Tasks</h2>
        <div>
          {finalData.map((val) => {
            if (val.strike == true) {
              return <h3>{val.task}</h3>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
