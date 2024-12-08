import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [text, setText] = useState('');
  const [analysisData, setAnalysisData] = useState(null);

  const analyzeText = () => {
    // Analyse des mots
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Convertir en format pour Recharts
    const data = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count
      }));

    // Statistiques générales
    const stats = {
      totalWords: words.length,
      uniqueWords: Object.keys(wordCount).length,
      avgWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length
    };

    setAnalysisData({ chartData: data, stats });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Analyseur de Texte
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <textarea
            className="w-full h-48 p-4 border rounded-lg mb-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Collez votre texte ici..."
          />
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={analyzeText}
          >
            Analyser
          </button>
        </div>

        {analysisData && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Total des mots</p>
                  <p className="text-2xl font-bold">{analysisData.stats.totalWords}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Mots uniques</p>
                  <p className="text-2xl font-bold">{analysisData.stats.uniqueWords}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Longueur moyenne</p>
                  <p className="text-2xl font-bold">{analysisData.stats.avgWordLength.toFixed(1)}</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Top 10 des mots les plus fréquents</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysisData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="word" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
