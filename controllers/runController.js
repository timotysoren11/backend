const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const tmpDir = path.join(__dirname, '..', 'tmp');

exports.runCode = (req, res) => {
  const { code, input } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  const timestamp = Date.now();
  const codeFile = `script_${timestamp}.py`;
  const inputFile = `input_${timestamp}.txt`;

  const codePath = path.join(tmpDir, codeFile);
  const inputPath = path.join(tmpDir, inputFile);

  // Save code and input to temp files
  fs.writeFileSync(codePath, code);
  fs.writeFileSync(inputPath, input || '');

  // Command to run Python with input redirected (no Docker)
  const runCommand = `python3 "${codePath}" < "${inputPath}"`;

  exec(runCommand, { timeout: 7000 }, (error, stdout, stderr) => {
    // Clean up temp files
    try {
      fs.unlinkSync(codePath);
      fs.unlinkSync(inputPath);
    } catch (err) {
      console.error('Error cleaning temp files:', err);
    }

    if (error) {
      return res.json({ output: stderr || error.message });
    }

    res.json({ output: stdout });
  });
};
