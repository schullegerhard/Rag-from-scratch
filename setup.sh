#!/bin/bash

# setup-src-structure.sh
# Creates the folder structure for the reusable RAG library

set -e  # Exit on error

echo "Creating RAG library folder structure in src/..."

# Create directories
mkdir -p src/embeddings
mkdir -p src/vector-stores
mkdir -p src/loaders
mkdir -p src/text-splitters
mkdir -p src/retrievers
mkdir -p src/chains
mkdir -p src/prompts/templates
mkdir -p src/utils

echo "✓ Directories created"

# Create embeddings files
touch src/embeddings/index.js
touch src/embeddings/EmbeddingModel.js
touch src/embeddings/EmbeddingCache.js

# Create vector-stores files
touch src/vector-stores/index.js
touch src/vector-stores/BaseVectorStore.js
touch src/vector-stores/InMemoryVectorStore.js
touch src/vector-stores/LanceDBVectorStore.js
touch src/vector-stores/QdrantVectorStore.js

# Create loaders files
touch src/loaders/index.js
touch src/loaders/BaseLoader.js
touch src/loaders/PDFLoader.js
touch src/loaders/TextLoader.js
touch src/loaders/DirectoryLoader.js

# Create text-splitters files
touch src/text-splitters/index.js
touch src/text-splitters/BaseTextSplitter.js
touch src/text-splitters/CharacterTextSplitter.js
touch src/text-splitters/RecursiveCharacterTextSplitter.js
touch src/text-splitters/TokenTextSplitter.js

# Create retrievers files
touch src/retrievers/index.js
touch src/retrievers/BaseRetriever.js
touch src/retrievers/VectorStoreRetriever.js
touch src/retrievers/RerankerRetriever.js
touch src/retrievers/HybridRetriever.js

# Create chains files
touch src/chains/index.js
touch src/chains/RetrievalChain.js
touch src/chains/RAGChain.js
touch src/chains/ConversationalChain.js

# Create prompts files
touch src/prompts/index.js
touch src/prompts/PromptTemplate.js
touch src/prompts/templates/qa.js
touch src/prompts/templates/summarization.js
touch src/prompts/templates/conversation.js

# Create utils files
touch src/utils/index.js
touch src/utils/Document.js
touch src/utils/similarity.js
touch src/utils/tokenizer.js
touch src/utils/validators.js

# Create main index.js
touch src/index.js

echo "✓ Files created"

# Create basic file headers
cat > src/embeddings/index.js << 'EOF'
/**
 * Embeddings module
 * Handles text-to-vector conversion
 */

export { EmbeddingModel } from './EmbeddingModel.js';
export { EmbeddingCache } from './EmbeddingCache.js';
EOF

cat > src/vector-stores/index.js << 'EOF'
/**
 * Vector Stores module
 * Vector storage and similarity search implementations
 */

export { BaseVectorStore } from './BaseVectorStore.js';
export { InMemoryVectorStore } from './InMemoryVectorStore.js';
export { LanceDBVectorStore } from './LanceDBVectorStore.js';
export { QdrantVectorStore } from './QdrantVectorStore.js';
EOF

cat > src/loaders/index.js << 'EOF'
/**
 * Loaders module
 * Document loading from various sources
 */

export { BaseLoader } from './BaseLoader.js';
export { PDFLoader } from './PDFLoader.js';
export { TextLoader } from './TextLoader.js';
export { DirectoryLoader } from './DirectoryLoader.js';
EOF

cat > src/text-splitters/index.js << 'EOF'
/**
 * Text Splitters module
 * Document chunking strategies
 */

export { BaseTextSplitter } from './BaseTextSplitter.js';
export { CharacterTextSplitter } from './CharacterTextSplitter.js';
export { RecursiveCharacterTextSplitter } from './RecursiveCharacterTextSplitter.js';
export { TokenTextSplitter } from './TokenTextSplitter.js';
EOF

cat > src/retrievers/index.js << 'EOF'
/**
 * Retrievers module
 * Document retrieval strategies
 */

export { BaseRetriever } from './BaseRetriever.js';
export { VectorStoreRetriever } from './VectorStoreRetriever.js';
export { RerankerRetriever } from './RerankerRetriever.js';
export { HybridRetriever } from './HybridRetriever.js';
EOF

cat > src/chains/index.js << 'EOF'
/**
 * Chains module
 * RAG pipeline orchestration
 */

export { RetrievalChain } from './RetrievalChain.js';
export { RAGChain } from './RAGChain.js';
export { ConversationalChain } from './ConversationalChain.js';
EOF

cat > src/prompts/index.js << 'EOF'
/**
 * Prompts module
 * Prompt template management
 */

export { PromptTemplate } from './PromptTemplate.js';
export * as qaTemplates from './templates/qa.js';
export * as summarizationTemplates from './templates/summarization.js';
export * as conversationTemplates from './templates/conversation.js';
EOF

cat > src/utils/index.js << 'EOF'
/**
 * Utils module
 * Shared utilities and helpers
 */

export { Document } from './Document.js';
export * as similarity from './similarity.js';
export * as tokenizer from './tokenizer.js';
export * as validators from './validators.js';
EOF

cat > src/index.js << 'EOF'
/**
 * RAG from Scratch - Main Library Export
 *
 * A modular library for building Retrieval Augmented Generation (RAG) systems.
 * Built from scratch for educational purposes and production use.
 */

// Embeddings
export * from './embeddings/index.js';

// Vector Stores
export * from './vector-stores/index.js';

// Loaders
export * from './loaders/index.js';

// Text Splitters
export * from './text-splitters/index.js';

// Retrievers
export * from './retrievers/index.js';

// Chains
export * from './chains/index.js';

// Prompts
export * from './prompts/index.js';

// Utils
export * from './utils/index.js';
EOF

echo "✓ Index files initialized"

# Create a README in src/
cat > src/README.md << 'EOF'
# RAG from Scratch - Source Library

This directory contains the reusable library code for the RAG from Scratch project.

## Structure

- **embeddings/** - Text-to-vector conversion and caching
- **vector-stores/** - Vector storage and similarity search implementations
- **loaders/** - Document loading from various sources (PDF, text, etc.)
- **text-splitters/** - Strategies for chunking documents
- **retrievers/** - Document retrieval strategies
- **chains/** - RAG pipeline orchestration
- **prompts/** - Prompt template management
- **utils/** - Shared utilities and helpers

## Usage

```javascript
import {
  EmbeddingModel,
  InMemoryVectorStore,
  PDFLoader,
  RecursiveCharacterTextSplitter,
  VectorStoreRetriever,
  RAGChain
} from './src/index.js';

// Build your RAG pipeline...
```

## Development

Each module follows these principles:
1. Single responsibility
2. Abstract base classes where appropriate
3. Consistent interfaces
4. Comprehensive error handling
5. Full JSDoc documentation

## Testing

Tests are located in the `/tests` directory and mirror this structure.
EOF

echo "✓ README created"

# Print tree structure
echo ""
echo "Folder structure created successfully!"
echo ""
echo "src/"
echo "├── embeddings/"
echo "│   ├── index.js"
echo "│   ├── EmbeddingModel.js"
echo "│   └── EmbeddingCache.js"
echo "├── vector-stores/"
echo "│   ├── index.js"
echo "│   ├── BaseVectorStore.js"
echo "│   ├── InMemoryVectorStore.js"
echo "│   ├── LanceDBVectorStore.js"
echo "│   └── QdrantVectorStore.js"
echo "├── loaders/"
echo "│   ├── index.js"
echo "│   ├── BaseLoader.js"
echo "│   ├── PDFLoader.js"
echo "│   ├── TextLoader.js"
echo "│   └── DirectoryLoader.js"
echo "├── text-splitters/"
echo "│   ├── index.js"
echo "│   ├── BaseTextSplitter.js"
echo "│   ├── CharacterTextSplitter.js"
echo "│   ├── RecursiveCharacterTextSplitter.js"
echo "│   └── TokenTextSplitter.js"
echo "├── retrievers/"
echo "│   ├── index.js"
echo "│   ├── BaseRetriever.js"
echo "│   ├── VectorStoreRetriever.js"
echo "│   ├── RerankerRetriever.js"
echo "│   └── HybridRetriever.js"
echo "├── chains/"
echo "│   ├── index.js"
echo "│   ├── RetrievalChain.js"
echo "│   ├── RAGChain.js"
echo "│   └── ConversationalChain.js"
echo "├── prompts/"
echo "│   ├── index.js"
echo "│   ├── PromptTemplate.js"
echo "│   └── templates/"
echo "│       ├── qa.js"
echo "│       ├── summarization.js"
echo "│       └── conversation.js"
echo "├── utils/"
echo "│   ├── index.js"
echo "│   ├── Document.js"
echo "│   ├── similarity.js"
echo "│   ├── tokenizer.js"
echo "│   └── validators.js"
echo "├── index.js"
echo "└── README.md"
echo ""
echo "Next steps:"
echo "1. Start implementing classes in each module"
echo "2. Extract code from examples/ into src/"
echo "3. Refactor examples to import from src/"
echo "4. Add tests in tests/ directory"
echo ""
echo "Example usage:"
echo "  import { EmbeddingModel } from './src/embeddings/index.js';"
echo ""