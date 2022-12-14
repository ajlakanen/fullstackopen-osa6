import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}
      <br />
      has {anecdote.votes} votes <button onClick={handleClick}>vote</button>
    </li>
  );
};

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.slice().sort((a, b) => b.votes - a.votes);

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.vote(anecdote.id);
            props.setNotification(`voted '${anecdote.content}'`, 5);
          }}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((a) => a.content.includes(state.filter)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (value) => {
      dispatch(vote(value));
    },

    setNotification: (value) => {
      dispatch(setNotification(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
