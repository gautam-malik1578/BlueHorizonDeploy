import { useForm } from "react-hook-form";
import { useFindNotes } from "../hooks/useFindNotes";
import Loader from "./Loader";
import NotFound from "./NotFound";
import styles from "./Notes.module.css";
import { useCreateNote } from "../hooks/useCreateNotes";
import { useUpdatenotes } from "../hooks/useUpdateNote";
import { updateANote } from "../services/notes";
function Notes({ attractionId }) {
  const { data, error, isLoading } = useFindNotes(attractionId);
  const { mutate: createNote } = useCreateNote(attractionId);
  const { mutate: updateNote } = useUpdatenotes(attractionId);
  let action = "";
  const { handleSubmit, register, reset } = useForm();
  // console.log("the data in the note  component is ", data);
  function onSubmitNote(formData) {
    // console.log(
    //   "all set to launch create not query with action set to ==",
    //   action
    // );
    const content = formData.content;
    if (data.length === 0) {
      createNote(content);
    } else {
      const noteId = data[0]._id;
      updateNote(
        { noteId, content, action },
        {
          onSuccess: () => {
            if (action === "delete") {
              reset();
            }
          },
        }
      );
    }
  }
  if (isLoading) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmitNote)} className={styles.form}>
      <label htmlFor="content">
        {data.length === 0
          ? "You have no note on this attraction yet "
          : "My note of this attraction"}
      </label>
      <textarea
        name="content"
        id="content"
        placeholder={
          data.length == 0 && "write your note here :) it shall remain private"
        }
        {...register("content")}
        defaultValue={data.length !== 0 ? data[0].content : ""}
      ></textarea>
      <div>
        <button
          onClick={() => {
            action = "update";
          }}
        >
          {data.length === 0 ? "create note" : "update note"}
        </button>
        {data.length !== 0 && (
          <button
            onClick={() => {
              action = "delete";
            }}
          >
            delete note
          </button>
        )}
      </div>
    </form>
  );
}

export default Notes;
