import { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import Button from '../../shared/Button';
import Code from '../../shared/Code';
import FlexCol from '../../layout/FlexCol';
import Content from '../../layout/Content';

const JSONToYaml = () => {
  const [jsonContext, setJsonContext] = useState<string>('');
  const [yamlcontext, setYamlContext] = useState<string>('');
  const [current, setCurrent] = useState<string>('json');
  const [loading, setLoading] = useState('');

  const handleLoading = async (
    cb: (...args: unknown[]) => Promise<void>,
    item: string
  ) => {
    setLoading(item);
    await cb();
    setTimeout(() => {
      setLoading('');
    }, 500);
  };

  const handleSave = () => {
    handleLoading(async () => await window.api.saveFile(yamlcontext), 'save');
  };

  const handleRandom = () => {
    handleLoading(async () => {
      setCurrent('json');
      const dummyList = ['posts', 'users', 'comments', 'photos', 'albums'];
      // math random from 1 to 100
      const random = Math.floor(Math.random() * 10) + 1;
      const randomPick = Math.floor(Math.random() * dummyList.length);
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/${dummyList[randomPick]}/${random}`
        );

        setJsonContext(JSON.stringify(data, null, 2));
        const t = yaml.dump(data);
        setYamlContext(t);
      } catch (error) {
        console.error(error);
      }
    }, 'random');
  };

  const handleOpen = () => {
    handleLoading(async () => {
      const content = await window.api.openFile('json');
      if (content) {
        setJsonContext(content);
        const text = yaml.dump(JSON.parse(content));
        setYamlContext(text);
      }
    }, 'open');
  };

  useEffect(() => {
    console.log();
  });

  return (
    <Content className="grid gap-x-6 grid-cols-2 h-full">
      <FlexCol>
        <Code
          copy
          label="JSON"
          code={jsonContext}
          language="json"
          className="flex-1"
          height="100%"
          maxWidth="100%"
          onFocus={() => {
            setCurrent('json');
          }}
          onChange={(value) => {
            if (current !== 'json') {
              return;
            }
            try {
              setJsonContext(value);
              const text = yaml.dump(JSON.parse(value.replace('\n', '')));
              setYamlContext(text);
            } catch (error) {
              setYamlContext('Not valid json object');
            }
          }}
        />
        <Content className="inline-flex gap-x-3">
          <Button onClick={handleOpen} loading={loading === 'open'}>
            Open
          </Button>
          <Button onClick={handleRandom} loading={loading === 'random'}>
            Random
          </Button>
        </Content>
      </FlexCol>
      <FlexCol>
        <Code
          copy
          label="YAML"
          code={yamlcontext}
          language="yaml"
          onFocus={() => {
            setCurrent('yaml');
          }}
          onChange={(value) => {
            if (current !== 'yaml') {
              return;
            }
            try {
              const text = yaml.load(value);
              if (typeof text === 'string') {
                throw 'Not valid yaml object';
              }
              setYamlContext(value);
              setJsonContext(JSON.stringify(text, null, 2));
            } catch (error) {
              setJsonContext('Not valid yaml object');
            }
          }}
        />
        <Content>
          <Button
            id="save-yaml"
            loading={loading === 'save'}
            onClick={handleSave}
          >
            Save
          </Button>
        </Content>
      </FlexCol>
    </Content>
  );
};

export default JSONToYaml;
