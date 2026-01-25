import type { Tool } from '../types';

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRRqqSJ4XAqTneWXTD5riZCAzy-NZHb0nsZUGmLxnKhB-G3aXCpZAX7Cq72xw1vg_uzZXR6-gkTj50L/pub?gid=360363462&single=true&output=csv';

interface CSVRow {
  [key: string]: string;
}

function parseCSV(csv: string): CSVRow[] {
  const lines = csv.trim().split('\n');
  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row: CSVRow = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
}

function csvRowToTool(row: CSVRow): Tool {
  return {
    Tool_ID: row['Tool_ID'] || '',
    Tool_Name: row['Tool_Name'] || '',
    AI_Category: row['AI_Category'] || '',
    Primary_Task: row['Primary_Task'] || '',
    Secondary_Tasks: row['Secondary_Tasks'] || '',
    Modality: row['Modality'] || '',
    Industry_Use: row['Industry_Use'] || '',
    Core_Technology: row['Core_Technology'] || '',
    Open_Source: row['Open_Source'] || 'No',
    Pricing_Model: row['Pricing_Model'] || '',
    Popular_Among: row['Popular_Among'] || '',
    Skill_Level: row['Skill_Level'] || '',
    Deployment_Type: row['Deployment_Type'] || '',
    Region_Origin: row['Region_Origin'] || '',
    Release_Year: row['Release_Year'] || '',
    Company_or_Organization: row['Company_or_Organization'] || '',
    Integration_Support: row['Integration_Support'] || '',
    Common_Use_Cases: row['Common_Use_Cases'] || '',
    Strengths: row['Strengths'] || '',
    Limitations: row['Limitations'] || '',
    Website_Category: row['Website_Category'] || '',
    URL: row['URL'] || ''
  };
}

export async function fetchAIToolsData(): Promise<Tool[]> {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }
    const csv = await response.text();
    const rows = parseCSV(csv);
    return rows.map(csvRowToTool);
  } catch (error) {
    console.error('Error fetching AI tools data:', error);
    return [];
  }
}
