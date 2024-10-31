import { useEffect } from "react";
import classes from "./NewsletterSignup.module.css";

import { useFetcher } from "react-router-dom";

function NewsletterSignup() {
  let fetcher = useFetcher();

  let { state, data } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert("you are login in successful");
    }
  }, [state, data]);

  return (
    <fetcher.Form
      method="post"
      className={classes.newsletter}
      action="/newsletter"
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
