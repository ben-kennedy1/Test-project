import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";
import useFetch from "./util/useFetch";

function App() {
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (v) => setActiveTab(v);

  const { data } = useFetch(
    "https://tppublic.blob.core.windows.net/test-data/super-heroes.json"
  );

  return (
    <div className="App m-5">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === "1" && "active"}
            onClick={() => {
              toggleTab("1");
            }}
            to="#"
          >
            List View
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" && "active"}
            onClick={() => {
              toggleTab("2");
            }}
            to="#"
          >
            Card View
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="p-2">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Table>
                <thead>
                  <tr>
                    <th>ID#</th>
                    <th>Name</th>
                    <th>Occupation</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "1" &&
                    data &&
                    data.map((d, i) => {
                      return (
                        <tr>
                          <th scope="row">{d.id}</th>
                          <td>{d.name}</td>
                          <td>{d.work?.occupation ?? "-"}</td>
                          <td>
                            <img
                              className="thumbnail"
                              src={d.image.url}
                              alt={d.name}
                              width="50"
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            {activeTab === "2" &&
              data &&
              data.map((d, i) => {
                return (
                  <Col md="3">
                    <Card style={{ width: "18rem" }}>
                      <CardImg variant="top" src={d.image.url} alt={d.name} />
                      <CardBody>
                        <CardTitle>{d.name}</CardTitle>
                        <CardText>{d.work?.occupation ?? "-"}</CardText>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default App;
