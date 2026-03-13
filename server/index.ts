import express from 'express';
import cors from 'cors';
import { parsePageSpec } from './parser/parsePageSpec';
import { normalizePageJson } from './parser/normalizePageJson';
import { buildRenderTree } from './engine/renderTreeBuilder';
import { renderHtml } from './renderers/html/renderHtml';
import { renderSvg } from './renderers/svg/renderSvg';
import { DeepseekClient } from './ai/deepseekClient';
import { buildPageSpecParserPrompt } from './ai/promptBuilder';
import { parseJsonFromLlmResponse } from './ai/responseParser';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/parse', (req, res) => {
  const spec = String(req.body?.spec ?? '');
  const parsed = normalizePageJson(parsePageSpec(spec));
  res.json(parsed);
});

app.post('/api/prototype', (req, res) => {
  const spec = String(req.body?.spec ?? '');
  const pageJson = normalizePageJson(parsePageSpec(spec));
  const tree = buildRenderTree(pageJson);

  res.json({
    pageJson,
    renderTree: tree,
    html: renderHtml(pageJson),
    svg: renderSvg(tree)
  });
});

app.post('/api/parse/ai', async (req, res) => {
  try {
    const client = new DeepseekClient();
    const spec = String(req.body?.spec ?? '');
    const prompt = buildPageSpecParserPrompt(spec);
    const payload = await client.chat([
      { role: 'system', content: 'You are a UI specification parser.' },
      { role: 'user', content: prompt }
    ]);
    const pageJson = normalizePageJson(parseJsonFromLlmResponse(payload));
    res.json(pageJson);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Page2Prototype server running on :${port}`);
});
