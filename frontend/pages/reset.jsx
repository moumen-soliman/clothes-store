import Reset from '../components/Reset';

const Reset = props => (
  <div>
    <p>Reset your Password {props.query.resetToken}</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default Reset;
