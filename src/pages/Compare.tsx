import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type Player = {
  id: number;
  name: string;
  team: string;
  region: string;
  kda: number;
  winrate: number;
  rating: number;
  kills: number;
  deaths: number;
  assists: number;
  gpm: number;
  earlyGame: number;
  midGame: number;
  lateGame: number;
  teamFight: number;
  farming: number;
};

const allPlayers: Player[] = [
  { id: 1, name: 'ShadowKing', team: 'Team Liquid', region: 'EU', kda: 4.8, winrate: 68, rating: 9850, kills: 892, deaths: 186, assists: 1024, gpm: 645, earlyGame: 88, midGame: 92, lateGame: 85, teamFight: 95, farming: 90 },
  { id: 2, name: 'PhoenixRise', team: 'OG Esports', region: 'EU', kda: 4.5, winrate: 65, rating: 9720, kills: 856, deaths: 190, assists: 998, gpm: 632, earlyGame: 85, midGame: 88, lateGame: 90, teamFight: 87, farming: 92 },
  { id: 3, name: 'ThunderStrike', team: 'Team Spirit', region: 'CIS', kda: 4.3, winrate: 63, rating: 9580, kills: 834, deaths: 194, assists: 945, gpm: 618, earlyGame: 90, midGame: 85, lateGame: 82, teamFight: 88, farming: 85 },
  { id: 4, name: 'IceBreaker', team: 'Evil Geniuses', region: 'NA', kda: 4.1, winrate: 61, rating: 9420, kills: 812, deaths: 198, assists: 923, gpm: 605, earlyGame: 82, midGame: 87, lateGame: 88, teamFight: 90, farming: 88 },
  { id: 5, name: 'DragonSlayer', team: 'PSG.LGD', region: 'CN', kda: 4.0, winrate: 60, rating: 9280, kills: 798, deaths: 200, assists: 902, gpm: 598, earlyGame: 87, midGame: 90, lateGame: 85, teamFight: 85, farming: 87 },
  { id: 6, name: 'NightHunter', team: 'Tundra Esports', region: 'EU', kda: 3.9, winrate: 59, rating: 9150, kills: 776, deaths: 199, assists: 886, gpm: 587, earlyGame: 80, midGame: 83, lateGame: 92, teamFight: 88, farming: 85 },
  { id: 7, name: 'StormBringer', team: 'Fnatic', region: 'SEA', kda: 3.8, winrate: 58, rating: 9020, kills: 765, deaths: 201, assists: 869, gpm: 574, earlyGame: 85, midGame: 80, lateGame: 87, teamFight: 82, farming: 90 },
  { id: 8, name: 'BladeRunner', team: 'T1', region: 'SEA', kda: 3.7, winrate: 57, rating: 8890, kills: 748, deaths: 202, assists: 856, gpm: 562, earlyGame: 78, midGame: 88, lateGame: 85, teamFight: 85, farming: 83 },
];

const Compare = () => {
  const navigate = useNavigate();
  const [player1Id, setPlayer1Id] = useState<string>('1');
  const [player2Id, setPlayer2Id] = useState<string>('2');

  const player1 = allPlayers.find(p => p.id === Number(player1Id));
  const player2 = allPlayers.find(p => p.id === Number(player2Id));

  const radarMetrics = [
    { key: 'earlyGame', label: 'Ранняя игра' },
    { key: 'midGame', label: 'Середина' },
    { key: 'lateGame', label: 'Поздняя игра' },
    { key: 'teamFight', label: 'Командные бои' },
    { key: 'farming', label: 'Фарм' },
  ];

  const getComparison = (val1: number, val2: number) => {
    if (val1 > val2) return 'better';
    if (val1 < val2) return 'worse';
    return 'equal';
  };

  const renderRadarChart = () => {
    if (!player1 || !player2) return null;

    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    const points = radarMetrics.length;

    const createPolygonPoints = (player: Player) => {
      return radarMetrics.map((metric, index) => {
        const angle = (Math.PI * 2 * index) / points - Math.PI / 2;
        const value = player[metric.key as keyof Player] as number;
        const r = (value / 100) * radius;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');
    };

    const createAxisLines = () => {
      return radarMetrics.map((metric, index) => {
        const angle = (Math.PI * 2 * index) / points - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const labelX = centerX + (radius + 30) * Math.cos(angle);
        const labelY = centerY + (radius + 30) * Math.sin(angle);

        return (
          <g key={index}>
            <line
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-muted-foreground"
              style={{ fontSize: '11px' }}
            >
              {metric.label}
            </text>
          </g>
        );
      });
    };

    const createGridCircles = () => {
      return [0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
        <circle
          key={scale}
          cx={centerX}
          cy={centerY}
          r={radius * scale}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ));
    };

    return (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {createGridCircles()}
        {createAxisLines()}
        <polygon
          points={createPolygonPoints(player1)}
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        <polygon
          points={createPolygonPoints(player2)}
          fill="hsl(var(--secondary))"
          fillOpacity="0.2"
          stroke="hsl(var(--secondary))"
          strokeWidth="2"
        />
      </svg>
    );
  };

  if (!player1 || !player2) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-6 animate-fade-in"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к таблице
        </Button>

        <header className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="GitCompare" size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold">Сравнение игроков</h1>
          </div>
          <p className="text-lg text-muted-foreground">Выберите двух игроков для детального сравнения статистики</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-card border-border animate-scale-in">
            <label className="text-sm text-muted-foreground mb-2 block">Игрок 1</label>
            <Select value={player1Id} onValueChange={setPlayer1Id}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allPlayers.map(player => (
                  <SelectItem key={player.id} value={String(player.id)}>
                    {player.name} - {player.team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-6 bg-card border-border animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <label className="text-sm text-muted-foreground mb-2 block">Игрок 2</label>
            <Select value={player2Id} onValueChange={setPlayer2Id}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allPlayers.map(player => (
                  <SelectItem key={player.id} value={String(player.id)}>
                    {player.name} - {player.team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card border-primary/50 border-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/30">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white text-3xl font-bold">
                  {player1.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{player1.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Icon name="Shield" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{player1.team}</span>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                <Icon name="Globe" size={12} className="mr-1" />
                {player1.region}
              </Badge>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <Icon name="Swords" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-2xl font-bold text-gradient">VS</p>
            </div>
          </Card>

          <Card className="p-6 bg-card border-secondary/50 border-2 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-secondary/30">
                <AvatarFallback className="bg-gradient-to-br from-secondary to-secondary/70 text-white text-3xl font-bold">
                  {player2.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{player2.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Icon name="Shield" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{player2.team}</span>
              </div>
              <Badge className="bg-secondary text-secondary-foreground">
                <Icon name="Globe" size={12} className="mr-1" />
                {player2.region}
              </Badge>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-card border-border mb-8 animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icon name="BarChart3" size={24} className="text-primary" />
            Сравнение показателей
          </h2>
          <div className="space-y-4">
            {[
              { key: 'rating', label: 'Рейтинг', icon: 'Star' },
              { key: 'kda', label: 'K/D/A', icon: 'Target' },
              { key: 'winrate', label: 'Винрейт', icon: 'TrendingUp', suffix: '%' },
              { key: 'gpm', label: 'GPM', icon: 'Coins' },
              { key: 'kills', label: 'Убийства', icon: 'Crosshair' },
              { key: 'assists', label: 'Ассисты', icon: 'Users' },
            ].map(({ key, label, icon, suffix = '' }) => {
              const val1 = player1[key as keyof Player] as number;
              const val2 = player2[key as keyof Player] as number;
              const comparison = getComparison(val1, val2);

              return (
                <div key={key} className="grid grid-cols-3 gap-4 items-center">
                  <div className={`text-right ${comparison === 'better' ? 'text-primary font-bold' : ''}`}>
                    <p className="text-xl">{val1}{suffix}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                      <Icon name={icon as any} size={16} />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  </div>
                  <div className={`text-left ${comparison === 'worse' ? 'text-secondary font-bold' : ''}`}>
                    <p className="text-xl">{val2}{suffix}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Radar" size={24} className="text-primary" />
            Радар-диаграмма навыков
          </h2>
          <div className="max-w-xl mx-auto">
            {renderRadarChart()}
          </div>
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span className="text-sm">{player1.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary rounded"></div>
              <span className="text-sm">{player2.name}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Compare;
