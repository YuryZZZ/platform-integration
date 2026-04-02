# Tool Integration Guide

Complete implementation guide for all design tools with full code examples.

---

## 🚀 Quick Start: 3 Steps

### Step 1: Choose Your Tool
```bash
# Firebase Studio
npm install firebase

# Google Stitch
npm install @google/stitch-sdk

# Lovable
# (Built-in to Lovable.dev)

# Antigravity
npm install @antigravity/sdk
```

### Step 2: Import Integration
```typescript
import { createFirebaseStudioIntegration } from './cms/integrations/firebase-studio'
import { createStitchIntegration } from './cms/integrations/stitch'
import { createLovableIntegration } from './cms/integrations/lovable'
import { createAntigravityIntegration } from './cms/integrations/antigravity'
```

### Step 3: Use Integration
```typescript
const integration = createFirebaseStudioIntegration({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  cmsApiUrl: 'https://your-cms.example.com/api',
})
```

---

## 🔥 Firebase Studio

### Full Configuration
```typescript
import { createFirebaseStudioIntegration, FirebaseStudioIntegration } from './cms/integrations/firebase-studio'

const firebase: FirebaseStudioIntegration = createFirebaseStudioIntegration({
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project',
  storageBucket: 'your-project.appspot.com',
  cmsApiUrl: 'https://cms.example.com/api',
})
```

### Features

| Feature | Description |
|--------|-------------|
| **Firestore** | Real-time database sync |
| **Storage** | Media file management |
| **Auth** | User authentication |
| **Analytics** | Event tracking |
| **Hosting** | One-click deployment |

### Usage Examples

#### Content Operations
```typescript
// Create content
const result = await firebase.createContent({
  id: 'page-home',
  type: 'page',
  data: {
    title: 'Home',
    content: 'Welcome to our site',
  },
  metadata: {
    status: 'published',
    author: 'john@example.com',
  },
})

// Query content
const pages = await firebase.queryContent('page', [
  where('metadata.status', '==', 'published'),
  orderBy('metadata.updatedAt', 'desc'),
  limit(10),
])

// Update content
await firebase.updateContent('page-home', {
  type: 'page',
  data: { title: 'Updated Home' },
})
```

#### Media Operations
```typescript
// Upload file
const file = new File(['content'])
const media = await firebase.uploadMedia(file, 'images')

// List media
const allMedia = await firebase.listMedia('images')

// Delete media
await firebase.deleteMedia(media.id)
```

#### Auth Operations
```typescript
// Sign in
const user = await firebase.signIn('user@example.com', 'password')

// Sign in with Google
const googleUser = await firebase.signInWithGoogle()

// Sign out
await firebase.signOut()

// Track auth state
const unsubscribe = firebase.onAuthChange((user) => {
  console.log('User:', user?.email)
})
```

#### React Hooks
```typescript
import { useFirebaseContent, useFirebaseQuery, useFirebaseAuth } from './cms/integrations/firebase-studio'

// Single content
function Page({ id }: { id: string }) {
  const { data, loading, error, update } = useFirebaseContent(firebase, 'page', id)
  
  if (loading) return <Spinner />
  if (error) return <Error error={error} />
  
  return (
    <div>
      <h1>{data?.title}</h1>
      <button onClick={() => update({ title: 'New Title' })}>
        Update
      </button>
    </div>
  )
}

// Query
function PageList() {
  const { data, loading } = useFirebaseQuery(firebase, 'page', [
    where('metadata.status', '==', 'published'),
    orderBy('metadata.updatedAt', 'desc'),
  ])
  
  return (
    <ul>
      {data.map(page => (
        <li key={page.id}>{page.title}</li>
      ))}
    </ul>
  )
}

// Auth
function AuthButton() {
  const { user, loading, signIn, signOut } = useFirebaseAuth(firebase)
  
  if (loading) return null
  
  return user ? (
    <button onClick={signOut}>Sign Out</button>
  ) : (
    <button onClick={() => signIn('user@example.com', 'password')}>
      Sign In
    </button>
  )
}
```

---

## 🎨 Google Stitch

### Full Configuration
```typescript
import { createStitchIntegration, StitchIntegration } from './cms/integrations/stitch'

const stitch: StitchIntegration = createStitchIntegration({
  apiKey: 'your-api-key', // Optional
  cmsApiUrl: 'https://cms.example.com/api',
})
```

### Features

| Feature | Description |
|--------|-------------|
| **Design Import** | Import from Figma, Sketch, XD |
| **Code Export** | Generate React, Vue, HTML |
| **Token Management** | Design tokens sync |
| **AI Enhancement** | AI-powered improvements |

### Usage Examples

#### Import Design
```typescript
// Import from Figma
const components = await stitch.importDesign({
  source: 'figma',
  url: 'https://figma.com/file/...',
  generateVariants: true,
  extractTokens: true,
})

// Import from image
const componentsFromImage = await stitch.importDesign({
  source: 'image',
  file: imageFile,
  generateVariants: false,
})
```

#### Component Operations
```typescript
// Create component
const component = await stitch.createComponent({
  name: 'Hero Section',
  design: {
    id: 'design-1',
    name: 'Hero',
    type: 'component',
    created: new Date(),
    updated: new Date(),
  },
  html: '<div class="hero">...</div>',
  css: '.hero { ... }',
  react: 'export function Hero() { ... }',
})

// List components
const allComponents = await stitch.listComponents({
  type: 'component',
  tags: ['hero', 'landing'],
})

// Generate code
const reactCode = await stitch.generateReact(component)
const vueCode = await stitch.generateVue(component)
const htmlCode = await stitch.generateHTML(component)
```

#### Token Operations
```typescript
// Create token
const token = await stitch.createToken({
  name: 'color.primary',
  type: 'color',
  value: '#3b82f6',
  description: 'Primary brand color',
})

// Export tokens
const cssTokens = await stitch.exportTokens('css')
const tailwindTokens = await stitch.exportTokens('tailwind')
```

#### AI Enhancement
```typescript
// Enhance with AI
const enhanced = await stitch.enhanceWithAI(component, 
  'Make it more modern and add dark mode support'
)

// Generate variants
const variants = await stitch.generateVariants(component)

// Get suggestions
const suggestions = await stitch.suggestImprovements(component)
console.log('Suggestions:', suggestions)
```

#### React Hooks
```typescript
import { useStitchComponent, useStitchComponents, useStitchTokens } from './cms/integrations/stitch'

// Single component
function ComponentViewer({ id }: { id: string }) {
  const { component, loading, update, enhance } = useStitchComponent(stitch, id)
  
  if (loading) return <Spinner />
  
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: component?.html || '' }} />
      <button onClick={() => enhance('Add animations')}>
        Enhance with AI
      </button>
    </div>
  )
}

// Component list
function ComponentList() {
  const { components, loading } = useStitchComponents(stitch, {
    type: 'component',
  })
  
  return (
    <div>
      {components.map(comp => (
        <ComponentCard key={comp.id} component={comp} />
      ))}
    </div>
  )
}

// Tokens
function TokenExporter() {
  const { tokens, loading, exportTokens } = useStitchTokens(stitch, 'color')
  
  const exportCSS = () => exportTokens('css')
  const exportTailwind = () => exportTokens('tailwind')
  
  return (
    <div>
      <button onClick={exportCSS}>Export CSS</button>
      <button onClick={exportTailwind}>Export Tailwind</button>
    </div>
  )
}
```

---

## 💜 Lovable

### Full Configuration
```typescript
import { createLovableIntegration, LovableIntegration } from './cms/integrations/lovable'

const lovable: LovableIntegration = createLovableIntegration({
  cmsApiUrl: 'https://cms.example.com/api',
  projectId: 'proj_123',
})
```

### Features

| Feature | Description |
|--------|-------------|
| **Project Sync** | Sync with Lovable projects |
| **Component Export** | Export components to Lovable |
| **Database Migration** | Migrate from Supabase to Payload |
| **Code Transformation** | Replace Supabase code |

### Usage Examples

#### Replace Supabase with Payload
```typescript
// Original Supabase code
const supabaseCode = `
  const { data, error } = await supabase
    .from('users')
    .select('*')
`

// Transform to Payload
const payloadCode = lovable.replaceSupabaseWithPayload(supabaseCode)
console.log(payloadCode)
// Output:
// const data = await fetch('/api/users').then(r => r.json())
```

#### Sync Components
```typescript
// Sync component to Lovable
await lovable.syncComponent({
  id: 'hero-1',
  name: 'Hero',
  code: 'export function Hero() { ... }',
  styles: '.hero { ... }',
  dependencies: ['framer-motion', 'lucide-react'],
})
```

---

## 🌌 Antigravity

### Full Configuration
```typescript
import { createAntigravityIntegration, AntigravityIntegration } from './cms/integrations/antigravity'

const antigravity: AntigravityIntegration = createAntigravityIntegration({
  apiKey: 'your-api-key',
  workspaceId: 'workspace-123',
  cmsApiUrl: 'https://cms.example.com/api',
})
```

### Features

| Feature | Description |
|--------|-------------|
| **AI Generation** | Generate from prompts |
| **Version Control** | Design versioning |
| **Collaboration** | Real-time editing |
| **Themes** | Theme management |
| **Code Export** | Multi-framework export |

### Usage Examples

#### AI Generation
```typescript
// Generate from prompt
const result = await antigravity.generateFromPrompt({
  text: 'Create a modern hero section with gradient background, animated text, and CTA button',
  context: {
    framework: 'react',
    style: 'modern',
    includeTests: true,
  },
})

if (result.success && result.component) {
  console.log('Generated:', result.component.name)
  console.log('Suggestions:', result.suggestions)
}
```

#### Collaboration
```typescript
// Start collaboration session
const session = await antigravity.startSession('design-123')

// Join session
await antigravity.joinSession(session.id)

// Broadcast changes
await antigravity.broadcastChange(session.id, {
  type: 'update',
  componentId: 'comp-1',
  changes: { color: '#3b82f6' },
})

// Subscribe to changes
const unsubscribe = antigravity.subscribeToChanges(session.id, (change) => {
  console.log('Change received:', change)
})

// Leave session
await antigravity.leaveSession(session.id)
```

#### Theme Management
```typescript
// Create theme
const theme = await antigravity.createTheme({
  name: 'Brand Theme',
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
  },
  typography: {
    heading: 'Inter',
    body: 'Inter',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
})

// Apply theme to component
await antigravity.applyTheme('comp-1', theme.id)
```

#### React Hooks
```typescript
import { 
  useAntigravityGeneration, 
  useAntigravityComponents,
  useAntigravityCollaboration 
} from './cms/integrations/antigravity'

// Generation
function Generator() {
  const { generate, isGenerating, result } = useAntigravityGeneration(antigravity)
  
  return (
    <div>
      <textarea placeholder="Describe your component..." />
      <button 
        onClick={() => generate({ text: textareaValue })}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>
      {result?.component && (
        <Preview component={result.component} />
      )}
    </div>
  )
}

// Components list
function ComponentList() {
  const { components, loading } = useAntigravityComponents(antigravity, {
    category: 'ui',
  })
  
  return (
    <div>
      {components.map(comp => (
        <ComponentCard key={comp.id} component={comp} />
      ))}
    </div>
  )
}

// Collaboration
function CollaborativeEditor({ designId }: { designId: string }) {
  const { session, changes, broadcast } = useAntigravityCollaboration(antigravity, designId)
  
  const handleChange = (change: any) => {
    broadcast(change)
  }
  
  return (
    <div>
      <Editor onChange={handleChange} />
      <ChangeHistory changes={changes} />
    </div>
  )
}
```

---

## 🔄 Master Integration Hub

### Usage
```typescript
import { IntegrationHubProvider, useIntegrationHub, useSyncAll } from './cms/integrations'

function App() {
  return (
    <IntegrationHubProvider
      config={{
        firebase: firebaseConfig,
        stitch: stitchConfig,
        lovable: lovableConfig,
        antigravity: antigravityConfig,
        cmsApiUrl: 'https://cms.example.com/api',
      }}
    >
      <YourApp />
    </IntegrationHubProvider>
  )
}

function SyncButton() {
  const { sync, report, loading } = useSyncAll()
  
  return (
    <button onClick={sync} disabled={loading}>
      {loading ? 'Syncing...' : 'Sync All'}
      {report && (
        <span>
          Exported: {report.exported} | Imported: {report.imported}
        </span>
      )}
    </button>
  )
}
```

---

## 📊 Feature Comparison

| Feature | Firebase Studio | Stitch | Lovable | Antigravity |
|---------|----------------|--------|---------|-------------|
| **Database** | ✅ Firestore | ❌ | ✅ Supabase* | ❌ |
| **Auth** | ✅ Firebase Auth | ❌ | ✅ Supabase* | ❌ |
| **Storage** | ✅ Firebase Storage | ❌ | ❌ | ❌ |
| **Design Import** | ❌ | ✅ Figma/Sketch/XD | ❌ | ✅ AI Prompt |
| **Code Export** | ❌ | ✅ Multi-framework | ✅ React | ✅ Multi-framework |
| **AI Generation** | ❌ | ✅ | ✅ | ✅✅ |
| **Collaboration** | ❌ | ❌ | ✅ | ✅ Real-time |
| **Themes** | ❌ | ✅ Tokens | ❌ | ✅ Full Themes |
| **Version Control** | ❌ | ❌ | ✅ Git | ✅ Design Versions |
| **CMS Sync** | ✅ | ✅ | ✅ | ✅ |

*Supabase replaced with Payload CMS via integration

---

## 🎯 Recommended Workflows

### For Production Apps
1. **Firebase Studio** for backend (auth, database, storage)
2. **Stitch** for design import from Figma
3. **Payload CMS** for content management

### For Rapid Prototyping
1. **Lovable** for quick UI generation
2. **Antigravity** for AI-powered components
3. **Firebase Studio** for real-time sync

### For Design Teams
1. **Stitch** for Figma → Code workflow
2. **Antigravity** for AI enhancements
3. **Payload CMS** for design token management

### For Solo Developers
1. **Antigravity** for AI-powered generation
2. **Firebase Studio** for full backend
3. **Payload CMS** for content

---

## 🔗 CMS Sync

All integrations sync with Payload CMS automatically:

```typescript
// Auto-sync on create/update
await firebase.createContent(content) // → Syncs to CMS
await stitch.createComponent(component) // → Syncs to CMS
await antigravity.createComponent(component) // → Syncs to CMS

// Manual sync
await integration.syncToCMS(item)

// Full sync
const result = await hub.syncAll()
console.log(`Exported: ${result.exported}, Imported: ${result.imported}`)
```
