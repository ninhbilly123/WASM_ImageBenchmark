const fileInput = document.querySelector('#files');
const dropZone = document.querySelector('#drop-zone');
const batch = document.querySelector('#batch');
const fileAlert = document.querySelector('#file-alert');
const fileList = document.querySelector('#file-list');
const fileSummary = document.querySelector('#file-summary');
const clearFiles = document.querySelector('#clear-files');

const numberFormat = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 });

function formatSize(bytes) {
  if (bytes < 1_000_000) return `${numberFormat.format(bytes / 1_000)} kB`;
  return `${numberFormat.format(bytes / 1_000_000)} MB`;
}

function showFiles(selectedFiles) {
  const files = Array.from(selectedFiles);
  const jpegFiles = files.filter(file =>
    file.type === 'image/jpeg' || (!file.type && /\.jpe?g$/i.test(file.name))
  );
  const rejectedCount = files.length - jpegFiles.length;
  fileAlert.hidden = rejectedCount === 0;
  fileAlert.textContent = rejectedCount ? `Đã bỏ qua ${rejectedCount} tệp ngoài định dạng JPEG.` : '';

  fileList.replaceChildren();
  for (const file of jpegFiles) {
    const item = document.createElement('li');
    const name = document.createElement('span');
    const size = document.createElement('span');
    name.textContent = file.name;
    size.textContent = formatSize(file.size);
    item.append(name, size);
    fileList.append(item);
  }

  const totalBytes = jpegFiles.reduce((sum, file) => sum + file.size, 0);
  batch.hidden = jpegFiles.length === 0;
  fileSummary.textContent = jpegFiles.length ? `${jpegFiles.length} ảnh · ${formatSize(totalBytes)}` : '';
}

fileInput.addEventListener('change', () => showFiles(fileInput.files));

dropZone.addEventListener('dragover', event => {
  if (!event.dataTransfer.types.includes('Files')) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  dropZone.classList.add('is-over');
});

dropZone.addEventListener('dragleave', event => {
  if (!dropZone.contains(event.relatedTarget)) dropZone.classList.remove('is-over');
});

dropZone.addEventListener('drop', event => {
  event.preventDefault();
  dropZone.classList.remove('is-over');
  if (!event.dataTransfer.files.length) return;
  fileInput.value = '';
  showFiles(event.dataTransfer.files);
});

clearFiles.addEventListener('click', () => {
  fileInput.value = '';
  showFiles([]);
  fileInput.focus();
});

const flows = document.querySelectorAll('[data-flow]');
for (const mode of document.querySelectorAll('input[name="mode"]')) {
  mode.addEventListener('change', () => {
    for (const flow of flows) flow.classList.toggle('is-active', flow.dataset.flow === mode.value);
  });
}
