import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
function NotPermitted() {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            onClick={() => {
              navigate("/");
            }}
            type="primary"
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
}

export default NotPermitted;
