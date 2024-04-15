import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "20%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>

              <Form.Control
                type="text"
                placeholder="Email or Phone"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, emailOrPhone: e.target.value })
                }
                value={loginInfo.emailOrPhone}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({
                    ...loginInfo,
                    password: e.target.value,
                  })
                }
                value={loginInfo.password}
              />
              <Button variant="primary" type="submit" disabled={isLoginLoading}>
                {isLoginLoading ? "Getting you in..." : "Login"}
              </Button>

              {loginError?.error && (
                <Alert variant="danger">
                  <b>{`Error status code: ${loginError?.status}`}</b>
                  <p>{loginError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
