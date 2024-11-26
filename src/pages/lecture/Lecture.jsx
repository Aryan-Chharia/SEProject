import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.error(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding lecture");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting lecture");
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          {/* Left Section: Lecture Display */}
          <div className="left">
            {lecLoading ? (
              <Loading />
            ) : lecture.video ? (
              <>
                <video
                  src={`${server}/${lecture.video}`}
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  autoPlay
                ></video>
                <h1>{lecture.title}</h1>
                <h3>{lecture.description}</h3>
              </>
            ) : (
              <h1>Please Select a Lecture</h1>
            )}
          </div>

          {/* Right Section: Lecture List and Admin Controls */}
          <div className="right">
            {user?.role === "admin" && (
              <button className="common-btn" onClick={() => setShow(!show)}>
                {show ? "Close" : "Add Lecture +"}
              </button>
            )}

            {/* Lecture Form for Admins */}
            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  <input
                    type="file"
                    placeholder="Choose video"
                    onChange={changeVideoHandler}
                    required
                  />

                  {videoPrev && <video src={videoPrev} controls></video>}

                  <button type="submit" disabled={btnLoading}>
                    {btnLoading ? "Please Wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}

            {/* Lecture List */}
            {lectures.length > 0 ? (
              lectures.map((lectureItem, index) => (
                <div key={lectureItem._id}>
                  <div
                    onClick={() => fetchLecture(lectureItem._id)}
                    className={`lecture-number ${
                      lecture._id === lectureItem._id ? "active" : ""
                    }`}
                  >
                    {index + 1}. {lectureItem.title}
                  </div>

                  {user?.role === "admin" && (
                    <button
                      className="common-btn"
                      style={{ background: "red" }}
                      onClick={() => deleteHandler(lectureItem._id)}
                    >
                      Delete {lectureItem.title}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No Lectures Yet!</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
