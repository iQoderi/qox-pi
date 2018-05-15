import { createElement, Component, render } from 'rax';
import QoxPage from 'qox-page';
import styles from './style.css';

const REG_PAGEID = /\?pageId=\d+$/ig;
const API_PREFIX = 'http://127.0.0.1:7001/page/modules?pageId=';

class App extends Component {
  state = {
    modules: []
  }

  componentWillMount() {
    const match = location.href.match(REG_PAGEID);

    if (match) {
      const pageId = match[0].split('=')[1];
      const uri = `${API_PREFIX}${pageId}`;

      fetch(uri).then((res) => {
        return res.json();
      }).then((ret) => {
        if (ret.code === 0) {
          this.setState({
            modules: ret.data.modules
          });
        }
      });
    }
  }

  render() {
    const { modules } = this.state;

    if(modules.length > 0) {
      return <QoxPage modules={modules} />
    }

    return null;
  }
}

render(<App/>);
