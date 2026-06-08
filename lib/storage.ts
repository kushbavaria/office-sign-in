import fs from 'fs';
import path from 'path';

interface VisitorData {
  timestamp: string;
  name: string;
  email: string;
  company: string;
  purpose: string;
  citizenship: string;
  ndaAgreed: boolean;
  signature: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'visitors.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

export function addVisitor(data: VisitorData): { success: boolean; error?: string } {
  try {
    const existingData = getVisitors();
    existingData.push(data);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving visitor data:', error);
    return { success: false, error: 'Failed to save visitor data' };
  }
}

export function getVisitors(): VisitorData[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading visitor data:', error);
    return [];
  }
}

export function clearVisitors(): { success: boolean; error?: string } {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error clearing visitor data:', error);
    return { success: false, error: 'Failed to clear visitor data' };
  }
}