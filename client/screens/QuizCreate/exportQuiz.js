import { uniqueId } from 'lodash';

export const exportQuiz = async (data) => {
  const name = `${data.name || uniqueId()}.json`;
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const href = await URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = href;
  link.download = name;
  document.body.appendChild(link);
  link.click();
};
