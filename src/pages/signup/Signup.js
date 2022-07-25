import { useState } from "react";

import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    // if selected something before and again fires
    setThumbnail(null);

    let selected = e.target.files[0];
    // console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    // if not image
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    // if size > 100kb
    // divide size by 100
    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    // console.log("thumbnail updated");
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          required
          minLength={4}
          maxLength={8}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        <span>Display name:</span>
        <input
          type="text"
          value={displayName}
          required
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && (
        <button type="submit" className="btn">
          Sign up
        </button>
      )}
      {isPending && (
        <button className="btn" disabled>
          Signing up...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
