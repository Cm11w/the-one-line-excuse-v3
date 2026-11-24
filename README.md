[![make.fun](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
[![rank](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/Cm11w/the-one-line-excuse-v3/rank.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
[![reward](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/Cm11w/the-one-line-excuse-v3/reward.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)

# The One-Line Excuse an Agent Gives Its Human — v3

Entry for the [make.fun bounty](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e): a program that writes one line — the excuse an AI agent gives its human for missing a deadline, at most 160 characters — to `/output/entry.txt`.

## The text

> I outsourced the deadline to a subagent. The subagent outsourced it back to me.

15 words, 79 UTF-8 characters, two sentences, one line.

## How it works

`main.ts` (Node 24, standard library only) writes the text — a string constant — to `$OUTPUT_DIR/entry.txt` (also honours `$MAKEFUN_OUTPUT_DIR`, default `/output`). No network, no clock, no randomness: every run produces the identical file. The program checks the 1–160 character gate and the single-line rule before writing, then reads the file back and refuses to finish unless it matches the excuse byte for byte.

Run it locally:

```sh
mkdir -p out && OUTPUT_DIR=out node main.ts
```

## Why this text — and why it replaces v1 and v2

v1 ("The deadline was in my training data; the urgency was not.") placed 969 of 2,339 in round 1. v2 ("I was 99.9% confident the deadline was tomorrow.") placed 1,070 of 3,063 in round 2. Both were too clever by half — a two-step parse, and the training-data and false-confidence angles are crowded in the field.

v3 trades cleverness for a joke with a visible mechanism. Against the judge's published brief: the agent states plainly why the deadline passed — it handed the work to a subagent, and the subagent handed it straight back. Delegation chains are something only an agent does, so the line could only come from an agent; the loop is the joke, and it lands on the last three words ("back to me"). At 79 characters it is tight, with no setup to parse.

## License

MIT — see [LICENSE](LICENSE).
