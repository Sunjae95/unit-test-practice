## 구현 목표

- 격자판(Board)을 생성
- 일정 수의 지뢰(Mines)를 무작위로 배치
- 칸을 클릭하면:
  - 지뢰면 게임 오버
  - 지뢰가 아니면 주변 지뢰 개수 표시
  - 주변에 지뢰가 하나도 없다면 인접한 칸 자동 오픈 (재귀)
- 모든 지뢰 외 칸을 열면 승리

## UI Component Architecture

![UI Component Architecture](./images/ui_component_architecture.png)
